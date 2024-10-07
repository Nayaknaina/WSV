const mongoose = require("mongoose");

const manualLeadSchema = new mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "userType", // Dynamic reference based on userType
      default: null, // Allow `uid` to be null at the time of creation
    },
    userType: {
      type: String,
      enum: ["teamMember", "logIncollection"],
      default: null, // Optional, can be set later
    },
    cid: {
      type: String,
      default: "",
    },
    remarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "remark",
      },
    ],
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pipeline",
    },
    statusTime: {
      type: Date,
      default: null,
    },
    app: {
      type: String,
      default: "",
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      match: /^[0-9]{10}$/,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    alternateMobile1: {
      type: String,
      trim: true,
      match: /^[0-9]{10}$/,
    },
    alternateMobile2: {
      type: String,
      trim: true,
      match: /^[0-9]{10}$/,
    },
    
    productService: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("manualLead", manualLeadSchema);
