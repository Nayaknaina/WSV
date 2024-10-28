const paypal = require("@paypal/checkout-server-sdk");
const path = require("path");

const logIncollection = require("../models/admin.model.js");
const Payment = require('../models/paySuccess.model.js');

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
    console.log("Rendering pricing page...");
    res.sendFile(path.join(__dirname, "../public/pricing.html"));
  } catch (error) {
    console.error("Error rendering buy page:", error.message);
  }
};

// PayPal Payment Route with Plan Handling
// const payProduct = async (req, res) => {
//   try {
//     console.log("Initiating PayPal payment...");

//     const { plan } = req.body;// Capture selected plan (monthly or yearly)
//     console.log(`Selected Plan: ${plan}`);

//     // Set the price and description dynamically
//     let price, description;
//     if (plan === 'monthly') {
//       price = "15.00";
//       description = "Monthly subscription for the best team ever";
//     } else if (plan === 'yearly') {
//       price = "10.00";
//       description = "Yearly subscription for the best team ever";
//     } else {
//       console.error("Invalid plan selection.");
//       return res.status(400).send("Invalid plan selection");
//     }

//     console.log(`Price: ${price}, Description: ${description}`);

//     const request = new paypal.orders.OrdersCreateRequest();
//     request.prefer("return=representation");
//     request.requestBody({
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           amount: {
//             currency_code: "USD",
//             value: price,
//             breakdown: {
//               item_total: {
//                 currency_code: "USD",
//                 value: price,
//               },
//             },
//           },
//           description: description,
//           items: [
//             {
//               name: "Subscription Plan",
//               sku: plan === 'monthly' ? "M001" : "Y001",
//               unit_amount: {
//                 currency_code: "USD",
//                 value: price,
//               },
//               quantity: "1",
//             },
//           ],
//         },
//       ],
//       application_context: {
//         return_url: `http://localhost:8000/payment/success?plan=${plan}`,
//         cancel_url: "http://localhost:8000/payment/cancel",
//       },
//     });

//     console.log("Sending payment request to PayPal...");
//     const order = await client().execute(request);

//     const approvalUrl = order.result.links.find(
//       (link) => link.rel === "approve"
//     ).href;

//     console.log(`Approval URL: ${approvalUrl}`);
//     res.redirect(approvalUrl); // Redirect user to PayPal
//   } catch (error) {
//     console.error("Error creating PayPal payment:", error.message);
//     res.status(500).send("Error creating PayPal payment");
//   }
// };
const payProduct = async (req, res) => {
  try {
    console.log("Initiating PayPal payment...");

    const { plan } = req.body; // Capture the plan from the POST request body
    console.log(`Selected Plan: ${plan}`);

    if (!['monthly', 'yearly'].includes(plan)) {
      return res.status(400).send("Invalid plan selection");
    }

    const price = plan === 'monthly' ? "15.00" : "10.00";
    const description = `${plan.charAt(0).toUpperCase() + plan.slice(1)} subscription`;

    console.log(`Price: ${price}, Description: ${description}`);

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: price,
            breakdown: { item_total: { currency_code: "USD", value: price } },
          },
          description,
          items: [
            {
              name: "Subscription Plan",
              sku: plan === 'monthly' ? "M001" : "Y001",
              unit_amount: { currency_code: "USD", value: price },
              quantity: "1",
            },
          ],
        },
      ],
      application_context: {
        return_url: `http://localhost:8000/payment/success?plan=${plan}`,
        cancel_url: "http://localhost:8000/payment/cancel",
      },
    });

    const order = await client().execute(request);
    const approvalUrl = order.result.links.find((link) => link.rel === "approve").href;

    console.log(`Approval URL: ${approvalUrl}`);
    res.status(200).json({ approvalUrl }); // Send the approval URL as JSON
  } catch (error) {
    console.error("Error creating PayPal payment:", error.message);
    res.status(500).send("Error creating PayPal payment");
  }
};

// Success Page with Plan Handling
const successPage = async (req, res) => {
  try {
    const { token, plan } = req.query; // Capture token and plan
    console.log(`Payment success callback. Token: ${token}, Plan: ${plan}`);

    const request = new paypal.orders.OrdersCaptureRequest(token);
    request.requestBody({});

    console.log("Capturing payment...");
    const capture = await client().execute(request);

    if (capture.result.status === "COMPLETED") {
      console.log("Payment captured successfully:", JSON.stringify(capture.result));

      // Find the admin user
      let admin = await logIncollection.findById(req.user.id);
      const currentDate = new Date();

      console.log("Updating subscription based on the plan...");
      if (plan === 'monthly') {
        admin.subscriptionLevel = "basic";
        admin.subscriptionExpiry = new Date(
          currentDate.setMonth(currentDate.getMonth() + 1)
        );
      } else if (plan === 'yearly') {
        admin.subscriptionLevel = "basic";
        admin.subscriptionExpiry = new Date(
          currentDate.setFullYear(currentDate.getFullYear() + 1)
        );
      }

      console.log("Saving payment details...");
      const payment = new Payment({
        uid: admin._id,
        cid: admin.cid,
        orderId: capture.result.id,
        paymentId: capture.result.purchase_units[0].payments.captures[0].id,
        payerId: capture.result.payer.payer_id,
        payerEmail: capture.result.payer.email_address,
        payerName: `${capture.result.payer.name.given_name} ${capture.result.payer.name.surname}`,
        payerCountryCode: capture.result.payer.address.country_code,
        amount: capture.result.purchase_units[0].payments.captures[0].amount.value,
        currency: capture.result.purchase_units[0].payments.captures[0].amount.currency_code,
        paymentStatus: capture.result.purchase_units[0].payments.captures[0].status,
        createTime: capture.result.purchase_units[0].payments.captures[0].create_time,
        updateTime: capture.result.purchase_units[0].payments.captures[0].update_time,
      });

      await payment.save();
      await admin.save();

      console.log("Payment successful and subscription updated.");
      res.render('success', { paymentDetails: payment, adminDetails: admin });
    } else {
      console.log("Payment not completed.");
      res.render('failure');
    }
  } catch (error) {
    console.error("Error capturing PayPal payment:", error.message);
    res.status(500).send("Error capturing PayPal payment");
  }
};

// Cancel Page Route
const cancelPage = async (req, res) => {
  try {
    console.log("Payment canceled by user.");
    res.send("<h1>Payment Canceled</h1>");
  } catch (error) {
    console.error("Error displaying cancel page:", error.message);
  }
};

module.exports = {
  renderBuyPage,
  payProduct,
  successPage,
  cancelPage,
};
