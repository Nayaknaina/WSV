const express = require('express');
const payment_route = express.Router(); 

const bodyParser = require('body-parser');
payment_route.use(bodyParser.json());
payment_route.use(bodyParser.urlencoded({ extended: false }));


const paymentController = require('../service/paymentController');

//  routes
payment_route.get('/', paymentController.renderBuyPage);
payment_route.post('/pay', paymentController.payProduct);
payment_route.get('/success', paymentController.successPage);
payment_route.get('/cancel', paymentController.cancelPage);
payment_route.get('/agree', paymentController.agreeForm);

module.exports = payment_route;
 