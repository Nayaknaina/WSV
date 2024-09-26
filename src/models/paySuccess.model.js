const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    uid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'logIncollection',
    },
    cid:String,
    orderId: String,
    paymentId: String,
    payerId: String,
    payerEmail: String,
    payerName: String,
    payerCountryCode: String,
    amount: Number,
    currency: String,
    paymentStatus: String,
    createTime: String,
    updateTime: String,
    paypalFee: Number,
    netAmount: Number
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
