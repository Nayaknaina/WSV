const paypal = require('@paypal/checkout-server-sdk');
const path = require('path');
const logIncollection = require('../models/admin.model.js');

// PayPal environment setup for Sandbox
const { PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY } = process.env;

function environment() {
    return new paypal.core.SandboxEnvironment(PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY);
}

function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

const renderBuyPage = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../public/pricing.html"));
    } catch (error) {
        console.log(error.message);
    }
};

// PayPal Payment Route
const payProduct = async (req, res) => {
    try {
        console.log("Initiating PayPal payment...");

        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: "25.00",
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: "25.00"
                        }
                    }
                },
                description: "Book for the best team ever",
                items: [{
                    name: "Book",
                    sku: "001",
                    unit_amount: {
                        currency_code: "USD",
                        value: "25.00"
                    },
                    quantity: "1"
                }]
            }],
            application_context: {
                return_url: "http://localhost:8000/payment/success",
                cancel_url: "http://localhost:8000/payment/cancel"
            }
        });

        const order = await client().execute(request);
        const approvalUrl = order.result.links.find(link => link.rel === 'approve').href;

        // Redirecting user to PayPal for approval
        res.redirect(approvalUrl);

    } catch (error) {
        console.log("Error creating PayPal payment: ", error.message);
        res.status(500).send("Error creating PayPal payment");
    }
};

// PayPal Success Page Route
const successPage = async (req, res) => {
    try {
        const { token } = req.query;  // token is the order ID (order ID = token in sandbox)

        const request = new paypal.orders.OrdersCaptureRequest(token);
        request.requestBody({}); // Empty body needed for the request

        const capture = await client().execute(request);

        if (capture.result.status === "COMPLETED") {
            console.log('Payment captured successfully:', JSON.stringify(capture.result));

            // Your logic to upgrade user subscription level to 'basic'
            let admin = await logIncollection.findById(req.user.id);
            admin.subscriptionLevel = 'basic';
            await admin.save();

            res.send('<h1>Payment Success</h1>');
        } else {
            res.send('<h1>Payment Failed</h1>');
        }

    } catch (error) {
        console.log("Error capturing PayPal payment: ", error.message);
        res.status(500).send("Error capturing PayPal payment");
    }
};

// PayPal Cancel Page Route
const cancelPage = async (req, res) => {
    try {
        res.send('<h1>Payment Canceled</h1>');
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    renderBuyPage,
    payProduct,
    successPage,
    cancelPage
};
