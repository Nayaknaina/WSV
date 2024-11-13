/*const paypal = require("@paypal/checkout-server-sdk");
const path = require("path");

const logIncollection = require("../models/admin.model.js");
const Payment = require("../models/paySuccess.model.js");

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
}*/


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


///actuall
// const payProduct = async (req, res) => {
//   try {
//     console.log("Initiating PayPal payment...");

//     const { plan } = req.body; // Capture the plan from the POST request body
//     console.log(`Selected Plan: ${plan}`);

//     if (!["monthly", "yearly"].includes(plan)) {
//       return res.status(400).send("Invalid plan selection");
//     }

//     // let priceMultipleVal = plan === 'monthly' ? 1 : 12;
//     const price = plan === "monthly" ? "15.00" : `${10.0 * 12}`;
//     const description = `${
//       plan.charAt(0).toUpperCase() + plan.slice(1)
//     } subscription`;

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
//             breakdown: { item_total: { currency_code: "USD", value: price } },
//           },
//           description,
//           items: [
//             {
//               name: "Subscription Plan",
//               sku: plan === "monthly" ? "M001" : "Y001",
//               unit_amount: { currency_code: "USD", value: price },
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

//     const order = await client().execute(request);
//     const approvalUrl = order.result.links.find(
//       (link) => link.rel === "approve"
//     ).href;

//     console.log(`Approval URL: ${approvalUrl}`);
//     res.status(200).json({ approvalUrl }); // Send the approval URL as JSON
//   } catch (error) {
//     console.error("Error creating PayPal payment:", error.message);
//     res.status(500).send("Error creating PayPal payment");
//   }
// };

// // Success Page with Plan Handling
// const successPage = async (req, res) => {
//   try {
//     const { token, plan } = req.query; // Capture token and plan
//     console.log(`Payment success callback. Token: ${token}, Plan: ${plan}`);

//     const request = new paypal.orders.OrdersCaptureRequest(token);
//     request.requestBody({});

//     console.log("Capturing payment...");
//     const capture = await client().execute(request);

//     if (capture.result.status === "COMPLETED") {
//       console.log(
//         "Payment captured successfully:",
//         JSON.stringify(capture.result)
//       );

//    // Find the admin user
// let admin = await logIncollection.findById(req.user.id);
// const currentDate = new Date();
// const oldSubscriptionDate = new Date(admin.subscriptionExpiry);
// const timeDifference = oldSubscriptionDate - currentDate;
// console.warn(timeDifference);
// console.log("Updating subscription based on the plan...");
// admin.subscriptionLevel = "basic"; // Set subscription level once

// if (plan === "monthly") {
//   console.warn("Monthly plan...");
//   if (timeDifference > 0) {
//     console.log("Existing time + new 1 month ");
//     let newExpiryDate = new Date(oldSubscriptionDate);
//     newExpiryDate.setMonth(newExpiryDate.getMonth() + 1);
//     console.warn(newExpiryDate);
//     admin.subscriptionExpiry = newExpiryDate;
//   } else {
//     console.log("Current time + 1 month");
//     let newExpiryDate = new Date(currentDate);
//     newExpiryDate.setMonth(newExpiryDate.getMonth() + 1);
//     console.warn(newExpiryDate);
//     admin.subscriptionExpiry = newExpiryDate;
//   }
// } else if (plan === "yearly") {
//   console.warn("Yearly plan...");
//   if (timeDifference > 0) {
//     console.log("Existing time + new 1 year");
//     let newExpiryDate = new Date(oldSubscriptionDate);
//     newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
//     console.warn(newExpiryDate);
//     admin.subscriptionExpiry = newExpiryDate;
//   } else {
//     console.log("Current time + new 1 year");
//     let newExpiryDate = new Date(currentDate);
//     newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
//     console.warn(newExpiryDate);
//     admin.subscriptionExpiry = newExpiryDate;
//   }
// }

// await admin.save();

//       console.log("Saving payment details...");
//       const payment = new Payment({
//         uid: admin._id,
//         cid: admin.cid,
//         orderId: capture.result.id,
//         paymentId: capture.result.purchase_units[0].payments.captures[0].id,
//         payerId: capture.result.payer.payer_id,
//         payerEmail: capture.result.payer.email_address,
//         payerName: `${capture.result.payer.name.given_name} ${capture.result.payer.name.surname}`,
//         payerCountryCode: capture.result.payer.address.country_code,
//         amount:
//           capture.result.purchase_units[0].payments.captures[0].amount.value,
//         currency:
//           capture.result.purchase_units[0].payments.captures[0].amount
//             .currency_code,
//         paymentStatus:
//           capture.result.purchase_units[0].payments.captures[0].status,
//         createTime:
//           capture.result.purchase_units[0].payments.captures[0].create_time,
//         updateTime:
//           capture.result.purchase_units[0].payments.captures[0].update_time,
//         address: {
//           address_line_1:
//             capture.result.purchase_units[0].shipping.address.address_line_1,
//           address_line_2:
//             capture.result.purchase_units[0].shipping.address.address_line_2 ||
//             "",
//           admin_area_2:
//             capture.result.purchase_units[0].shipping.address.admin_area_2,
//           admin_area_1:
//             capture.result.purchase_units[0].shipping.address.admin_area_1,
//           postal_code:
//             capture.result.purchase_units[0].shipping.address.postal_code,
//           country_code:
//             capture.result.purchase_units[0].shipping.address.country_code,
//         },

//         gross_amount: {
//           currency_code:
//             capture.result.purchase_units[0].payments.captures[0]
//               .seller_receivable_breakdown.gross_amount.currency_code,
//           value:
//             capture.result.purchase_units[0].payments.captures[0]
//               .seller_receivable_breakdown.gross_amount.value,
//         },
//         paypal_fee: {
//           currency_code:
//             capture.result.purchase_units[0].payments.captures[0]
//               .seller_receivable_breakdown.paypal_fee.currency_code,
//           value:
//             capture.result.purchase_units[0].payments.captures[0]
//               .seller_receivable_breakdown.paypal_fee.value,
//         },
//         net_amount: {
//           currency_code:
//             capture.result.purchase_units[0].payments.captures[0]
//               .seller_receivable_breakdown.net_amount.currency_code,
//           value:
//             capture.result.purchase_units[0].payments.captures[0]
//               .seller_receivable_breakdown.net_amount.value,
//         },

//         business_name: capture.result.payment_source.paypal.business_name,
//       });

//       await payment.save();
//       await admin.save();

//       console.log("Payment successful and subscription updated.");
//       res.render("success", { paymentDetails: payment, adminDetails: admin });
//     } else {
//       console.log("Payment not completed.");
//       res.render("failure");
//     }
//   } catch (error) {
//     console.error("Error capturing PayPal payment:", error.message);
//     res.status(500).send("Error capturing PayPal payment");
//   }
// };

// // Cancel Page Route
// const cancelPage = async (req, res) => {
//   try {
//     console.log("Payment canceled by user.");
//     res.send("<h1>Payment Canceled</h1>");
//   } catch (error) {
//     console.error("Error displaying cancel page:", error.message);
//   }
// };

// module.exports = {
//   renderBuyPage,
//   payProduct,
//   successPage,
//   cancelPage,
// };

const Razorpay = require('razorpay');
const logIncollection = require("../models/admin.model.js");
const crypto = require('crypto');


const razorpay = new Razorpay({
  key_id: 'rzp_test_OqOrf7Nc8Ueiv7',
  key_secret: '9Ph6QKeLleapy8SMEMPY6Jfp',
});
const renderBuyPage = async (req, res) => {
  try {
    console.log("Rendering pricing page...");
    res.sendFile(path.join(__dirname, "../public/pricing.html"));
  } catch (error) {
    console.error("Error rendering buy page:", error.message);
  }
};

const payProduct = async (req, res) => {
  try {
    const { plan } = req.body;
    const price = plan === "monthly" ? 1500 : 12000;

    const options = {
      amount: price,
      currency: "INR",
      receipt: `receipt_${Math.random()}`,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    console.log("order have",JSON.stringify(order, null, 2));
    
    res.status(200).json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error("Error creating Razorpay payment:", error.message);
    res.status(500).send("Error creating Razorpay payment");
  }
};


const successPage = async (req, res) => {
  console.log("we are in success");
  try {
    const { order_id, payment_id, signature } = req.body;
    const {  plan } = req.query;
  
    const generatedSignature = crypto.createHmac('sha256', '9Ph6QKeLleapy8SMEMPY6Jfp')
      .update(`${order_id}|${payment_id}`)
      .digest('hex');

    if (generatedSignature !== signature) {
      console.error("Invalid signature");
      return res.status(400).send("Invalid signature");
    }

    let admin = await logIncollection.findById(req.user.id);
    admin.subscriptionLevel = "basic";


    if (plan === "monthly") {
      admin.subscriptionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 1 month later
    } else {
      admin.subscriptionExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year later
    }

    await admin.save();

    console.log("Payment successful and subscription updated.");
    res.render("success", { paymentDetails: { order_id, payment_id }, adminDetails: admin });
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error.message);
    res.status(500).send("Error verifying Razorpay payment");
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