const mongoose = require("mongoose");

const leadsSchema = new mongoose.Schema(
  {
    lead_id: {
      type: String,
    },

    uid: {
      type: String,
    },
    cid: {
      type: String,
    },

    income_time: {
      type: Date,
    },

    remarks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'remark',
    }],             
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pipeline',
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
