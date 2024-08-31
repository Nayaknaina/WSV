const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    title:{
      type:String,
      lowercase: true,
      trim: true,
    },              
    text:{
      type:String,
      lowercase: true,
      trim: true,
    },
    uid: {
      type: mongoose.Schema.ObjectId,
      ref: "logIncollection",
    },
    cid:{
      type: String,
    },
    image:{
      type: String,
      default: ''
    },
    pdf:{
      type: String,
      default: ''
    },
    client: {
      type: Boolean,
      default: false
    },
    team: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("template", templateSchema);
