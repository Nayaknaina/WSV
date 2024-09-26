// const paypal = require('paypal-rest-sdk');

// const { PAYPAL_MODE, PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY } = process.env;

// paypal.configure({
//   'mode': PAYPAL_MODE, //sandbox or live
//   'client_id': PAYPAL_CLIENT_KEY,
//   'client_secret': PAYPAL_SECRET_KEY
// });

// const renderBuyPage = async(req,res)=>{

//     try {

//         res.render('index');

//     } catch (error) {
//         console.log(error.message);
//     }

// }

// const payProduct = async(req,res)=>{

//     try {

//         const create_payment_json = {
//             "intent": "sale",
//             "payer": {
//                 "payment_method": "paypal"
//             },
//             "redirect_urls": {
//                 "return_url": "http://localhost:3000/success",
//                 "cancel_url": "http://localhost:3000/cancel"
//             },
//             "transactions": [{
//                 "item_list": {
//                     "items": [{
//                         "name": "Book",
//                         "sku": "001",
//                         "price": "25.00",
//                         "currency": "USD",
//                         "quantity": 1
//                     }]
//                 },
//                 "amount": {
//                     "currency": "USD",
//                     "total": "25.00"
//                 },
//                 "description": "Hat for the best team ever"
//             }]
//         };

//         paypal.payment.create(create_payment_json, function (error, payment) {
//             if (error) {
//                 throw error;
//             } else {
//                 for(let i = 0;i < payment.links.length;i++){
//                   if(payment.links[i].rel === 'approval_url'){
//                     res.redirect(payment.links[i].href);
//                   }
//                 }
//             }
//           });

//     } catch (error) {
//         console.log(error.message);
//     }

// }

// const successPage = async(req,res)=>{

//     try {

//         const payerId = req.query.PayerID;
//         const paymentId = req.query.paymentId;

//         const execute_payment_json = {
//             "payer_id": payerId,
//             "transactions": [{
//                 "amount": {
//                     "currency": "USD",
//                     "total": "25.00"
//                 }
//             }]
//         };

//         paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//             if (error) {
//                 console.log(error.response);
//                 throw error;
//             } else {
//                 console.log(JSON.stringify(payment));
//                 res.render('success');
//             }
//         });

//     } catch (error) {
//         console.log(error.message);
//     }

// }

// const cancelPage = async(req,res)=>{

//     try {

//         res.render('cancel');

//     } catch (error) {
//         console.log(error.message);
//     }

// }

// module.exports = {
//     renderBuyPage,
//     payProduct,
//     successPage,
//     cancelPage
// }
const paypal = require('@paypal/checkout-server-sdk');


const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET_KEY);
const client = new paypal.core.PayPalHttpClient(environment);


const renderBuyPage = async (req, res) => {
    try {
        res.sendFile(path.join(static_path, "pricing.html"));

    } catch (error) {
        console.log(error.message);
    }
};

const agreeForm = async (req, res) => {
    try {
        res.sendFile(path.join(static_path, "pricing.html"));

    } catch (error) {
        console.log(error.message);
    }
};


const payProduct = async (req, res) => {
    console.log("hello nayak ji");
    
    console.log(req.body);
    
    // try {
    //     const request = new paypal.orders.OrdersCreateRequest();
    //     request.prefer('return=representation');
    //     request.requestBody({
    //         intent: 'CAPTURE',
    //         purchase_units: [{
    //             amount: {
    //                 currency_code: 'USD',
    //                 value: '25.00'
    //             },
    //             description: 'Hat for the best team ever',
    //             items: [{
    //                 name: 'Book',
    //                 sku: '001',
    //                 unit_amount: {
    //                     currency_code: 'USD',
    //                     value: '25.00'
    //                 },
    //                 quantity: '1'
    //             }]
    //         }],
    //         application_context: {
    //             return_url: 'http://localhost:3000/success',
    //             cancel_url: 'http://localhost:3000/cancel'
    //         }
    //     });

    //     // Execute the order creation
    //     const order = await client.execute(request);

    //     // Redirect to the approval URL
    //     const approvalUrl = order.result.links.find(link => link.rel === 'approve');
    //     res.redirect(approvalUrl.href);

    // } catch (error) {
    //     console.log(error.message);
    //     res.status(500).send('Error processing payment');
    // }
};

// Handle the success page and capture payment
const successPage = async (req, res) => {
    try {
        const { token } = req.query;

        // Capture payment
        const captureRequest = new paypal.orders.OrdersCaptureRequest(token);
        captureRequest.requestBody({});
        const capture = await client.execute(captureRequest);

        console.log(JSON.stringify(capture.result));
        res.render('success');

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Error completing payment');
    }
};

// Render the cancel page
const cancelPage = async (req, res) => {
    try {
        res.render('cancel');
    } catch (error) {
        console.log(error.message);
    }
};

// Export the functions
module.exports = {
    renderBuyPage,
    payProduct,
    successPage,
    cancelPage,
    agreeForm
};
