const mongoose = require("mongoose");

const leadsSchema = new mongoose.Schema(
  {
    lead_id: {
      type: String,
      default: ''
    },
    page_id: {
      type: String,
      default: ''
    },
    form_id: {
      type: String,
      default: ''
    },
    page_name: {
      type: String,
      default: ''
    },
    form_name: {
      type: String,
      default: ''
    },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'userType',  // Dynamic reference based on userType
      default: null,        // Allow `uid` to be null at the time of creation
    },
    userType: {
      type: String,
      enum: ['teamMember', 'logIncollection'],
      default: null,        // Optional, can be set later
    },

    cid: {
      type: String,
      default: ''
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
    statusTime: {
      type: Date,
      default: null,
    },

    // New Fields for Customer Info
    customerName: { type: String, default: 'Unknown' },
    customerPhoneNumber: { type: String, default: 'N/A' },


    leads_data: [
      {
        _id: false,
        que: String,
        ans: String,
      },
    ],
    app: {
      type: String,
      default: ''
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lead", leadsSchema);
