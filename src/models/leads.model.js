const mongoose = require("mongoose");

const leadsSchema = new mongoose.Schema(
  {
    lead_id: {
      type: String,
    },

    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },

    income_time: {
      type: Date,
    },

    status: {
      type: Boolean,
      default: false,
    },             

    user_details: [
      {
        name: String,
        value: String,
      },
    ],
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lead", leadsSchema);
