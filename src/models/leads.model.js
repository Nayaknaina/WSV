const mongoose = require("mongoose");

const leadsSchema = new mongoose.Schema(
  {
    lead_id: {
      type: String,
    },

    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    cid: {
      type: String,
    },

    income_time: {
      type: Date,
    },

    status: {
      type: Boolean,
      default: false,
    },             

    leads_data: [
      {
        _id: false,
        que: String,
        ans: String,
      },
    ],
    app:String,
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lead", leadsSchema);
