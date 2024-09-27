const express = require('express');
const payment_route = express.Router(); 

// const bodyParser = require('body-parser');
// payment_route.use(bodyParser.json());
// payment_route.use(bodyParser.urlencoded({ extended: false }));

const leadsModel = require("../models/leads.model.js");

const paymentController = require('../service/paymentController');
const { isAdminLoggedIn } = require('../middilware/middilware');

//  routes
payment_route.get('/', paymentController.renderBuyPage);
payment_route.post('/pay', isAdminLoggedIn, paymentController.payProduct);
payment_route.get('/success', isAdminLoggedIn, paymentController.successPage);
payment_route.get('/cancel',  isAdminLoggedIn,paymentController.cancelPage);
// payment_route.get('/free/lead', isAdminLoggedIn ,async(req,res)=>{
//   await leadsModel.updateMany({}, { $set: { uid: null, userType: null } });
//   res.redirect('/leads')
// });

module.exports = payment_route;
 