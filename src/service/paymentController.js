const paypal = require('paypal-rest-sdk');
let path = require('path')
const logIncollection = require('../models/admin.model.js')

const { PAYPAL_MODE, PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY } = process.env;
// const static_path = path.join(__dirname, "../public");
paypal.configure({
  'mode': PAYPAL_MODE, //sandbox or live
  'client_id': PAYPAL_CLIENT_KEY,
  'client_secret': PAYPAL_SECRET_KEY
});

const renderBuyPage = async(req,res)=>{

    try {
        
        res.sendFile(path.join(static_path, "pricing.html"));

    } catch (error) {
        console.log(error.message);
    }

}

const payProduct = async(req,res)=>{
            console.log("hello");
            
    try {
        
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:8000/payment/success",
                "cancel_url": "http://localhost:8000/payment/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Book",
                        "sku": "001",
                        "price": "25.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                },
                "description": "Hat for the best team ever"
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for(let i = 0;i < payment.links.length;i++){
                  if(payment.links[i].rel === 'approval_url'){
                    res.redirect(payment.links[i].href);
                  }
                }
            }
          });

    } catch (error) {
        console.log(error.message);
    }

}

const successPage = async (req,res)=>{

    try {
        
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                // my logic for free to pro 
                
                let admin = await logIncollection.findById(req.user.id)
                admin.subscriptionLevel = 'basic'
                await admin.save()
                res.send('<h1>payment success</h1>')
                // res.render('success');
            }
        });

    } catch (error) {
        console.log(error.message);
    }

}

const cancelPage = async(req,res)=>{

    try {
        res.send('<h1>payment canceled</h1>')
        // res.render('cancel');

    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    renderBuyPage,
    payProduct,
    successPage,
    cancelPage
}