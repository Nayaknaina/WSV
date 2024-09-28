const paypal = require("@paypal/checkout-server-sdk");
const path = require("path");

const logIncollection = require("../models/admin.model.js");
const Payment = require('../models/paySuccess.model.js');
// PayPal environment setup for Sandbox
const { PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY } = process.env;

function environment() {
  return new paypal.core.SandboxEnvironment(
    PAYPAL_CLIENT_KEY,
    PAYPAL_SECRET_KEY
  );
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
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "25.00",
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: "25.00",
              },
            },
          },
          description: "Book for the best team ever",
          items: [
            {
              name: "Book",
              sku: "001",
              unit_amount: {
                currency_code: "USD",
                value: "25.00",
              },
              quantity: "1",
            },
          ],
        },
      ],
      application_context: {
        return_url: "http://localhost:8000/payment/success",
        cancel_url: "http://localhost:8000/payment/cancel",
      },
    });

    const order = await client().execute(request);
    const approvalUrl = order.result.links.find(
      (link) => link.rel === "approve"
    ).href;

    // Redirecting user to PayPal for approval
    res.redirect(approvalUrl);
  } catch (error) {
    console.log("Error creating PayPal payment: ", error.message);
    res.status(500).send("Error creating PayPal payment");
  }
};

// PayPal Success Page Route
// PayPal Success Page Route
const successPage = async (req, res) => {
  try {
    const { token } = req.query; // token is the order ID (order ID = token in sandbox)

    const request = new paypal.orders.OrdersCaptureRequest(token);
    request.requestBody({}); // Empty body needed for the request

    const capture = await client().execute(request);

    if (capture.result.status === "COMPLETED") {
      console.log(
        "Payment captured successfully:",
        JSON.stringify(capture.result)
      );

      let admin = await logIncollection.findById(req.user.id);
      admin.subscriptionLevel = "basic";
      const payment = new Payment({
        uid: admin._id,
        cid: admin.cid,
        orderId: capture.result.id,
        paymentId: capture.result.purchase_units[0].payments.captures[0].id,
        payerId: capture.result.payer.payer_id,
        payerEmail: capture.result.payer.email_address,
        payerName: `${capture.result.payer.name.given_name} ${capture.result.payer.name.surname}`,
        payerCountryCode: capture.result.payer.address.country_code,
        amount:
          capture.result.purchase_units[0].payments.captures[0].amount.value,
        currency:
          capture.result.purchase_units[0].payments.captures[0].amount
            .currency_code,
        paymentStatus:
          capture.result.purchase_units[0].payments.captures[0].status,
        createTime:
          capture.result.purchase_units[0].payments.captures[0].create_time,
        updateTime:
          capture.result.purchase_units[0].payments.captures[0].update_time,
        paypalFee:
          capture.result.purchase_units[0].payments.captures[0]
            .seller_receivable_breakdown.paypal_fee.value,
        netAmount:
          capture.result.purchase_units[0].payments.captures[0]
            .seller_receivable_breakdown.net_amount.value,
      });

      await payment.save();
      await admin.save();

     console.log("payment suceess");
     
      res.render('success', {
        paymentDetails: payment, // Pass payment details to the template
        adminDetails: admin, // Pass admin details to the template
      });
    } else {
      res.render('failure'); // Render a failure template in case payment is not completed
    }
  } catch (error) {
    console.log("Error capturing PayPal payment: ", error.message);
    res.status(500).send("Error capturing PayPal payment");
  }
};

// PayPal Cancel Page Route
const cancelPage = async (req, res) => {
  try {
    res.send("<h1>Payment Canceled</h1>");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  renderBuyPage,
  payProduct,
  successPage,
  cancelPage,
};
