const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "logIncollection",
    },
    cid: String,
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
    netAmount: Number,
    address: {
      address_line_1: String,
      address_line_2: String,
      admin_area_2: String,
      admin_area_1: String,
      postal_code: String,
      country_code: String,
    },
    business_name: String,
    gross_amount: {
      currency_code: String,
      value: String,
    },
    paypal_fee: {
      currency_code: String,
      value: String,
    },
    net_amount: {
      currency_code: String,
      value: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
