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

    status: {
      type: String,
      enum: ['new', 'pending', 'completed', 'lost'], 
      default: 'new', 
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
