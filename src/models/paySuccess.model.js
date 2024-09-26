const mongoose = require('mongoose');

const paypalReciptSchema = new mongoose.Schema({
  uid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'logincollection',
  },
  cid:String,
  id: { type: String, required: true },
  intent: { type: String, required: true },
  state: { type: String, required: true },
  cart: { type: String, required: true },
  payer: {
    payment_method: { type: String, required: true },
    status: { type: String, required: true },
    payer_info: {
      email: { type: String, required: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      payer_id: { type: String, required: true },
   
      country_code: { type: String, required: true },
    }
  },
  transactions: [{
    amount: {
      total: { type: String, required: true },
      currency: { type: String, required: true },
      details: {
        subtotal: { type: String, required: true },
        shipping: { type: String, required: true },
        insurance: { type: String, required: true },
        handling_fee: { type: String, required: true },
        shipping_discount: { type: String, required: true },
        discount: { type: String, required: true }
      }
    },
    payee: {
      merchant_id: { type: String, required: true },
      email: { type: String, required: true }
    },
    item_list: {
      items: [{
        name: { type: String, required: true },
        sku: { type: String, required: true },
        price: { type: String, required: true },
        currency: { type: String, required: true },
        tax: { type: String, required: true },
        quantity: { type: Number, required: true },
        image_url: { type: String, required: false }
      }],
      shipping_address: {
        recipient_name: { type: String, required: true },
        line1: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postal_code: { type: String, required: true },
        country_code: { type: String, required: true }
      }
    },
    failed_transactions:[],
  }],
  create_time: { type: Date, required: true },
  update_time: { type: Date, required: true },
 
  httpStatusCode: { type: Number, required: true }
}, { collection: 'paypalRecipt' });

module.exports = mongoose.model('paypalRecipt', paypalReciptSchema);

router.post('/success', async (req, res) => {
  try {
    const paypalData = req.body; // yahan aapka JSON response aayega

    // Data ko extract karna
    const newReceipt = new PayPalReceipt({
      uid: req.body.uid, // Yahan aap user ID set kar sakte hain
      cid: req.body.cid, // Yahan aap customer ID set kar sakte hain
      id: paypalData.id,
      intent: paypalData.intent,
      state: paypalData.state,
      cart: paypalData.cart,
      payer: {
        payment_method: paypalData.payer.payment_method,
        status: paypalData.payer.status,
        payer_info: {
          email: paypalData.payer.payer_info.email,
          first_name: paypalData.payer.payer_info.first_name,
          last_name: paypalData.payer.payer_info.last_name,
          payer_id: paypalData.payer.payer_info.payer_id,
          country_code: paypalData.payer.payer_info.country_code,
        }
      },
      transactions: paypalData.transactions.map(transaction => ({
        amount: {
          total: transaction.amount.total,
          currency: transaction.amount.currency,
          details: transaction.amount.details,
        },
        payee: {
          merchant_id: transaction.payee.merchant_id,
          email: transaction.payee.email,
        },
        item_list: {
          items: transaction.item_list.items.map(item => ({
            name: item.name,
            sku: item.sku,
            price: item.price,
            currency: item.currency,
            tax: item.tax,
            quantity: item.quantity,
            image_url: item.image_url,
          })),
          shipping_address: transaction.item_list.shipping_address,
        },
        failed_transactions: transaction.failed_transactions,
      })),
      create_time: new Date(paypalData.create_time),
      update_time: new Date(paypalData.update_time),
      httpStatusCode: paypalData.httpStatusCode,
    });

    // Save karna database me
    await newReceipt.save();
    res.status(200).send({ message: 'Payment receipt saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error saving payment receipt.' });
  }
});