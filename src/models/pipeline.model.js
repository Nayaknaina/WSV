const mongoose = require("mongoose");

const pipelineSchema = new mongoose.Schema(
  {
    time: {
      type: Date,
      default: Date.now, 
    },

    title:{
      type:String,
      lowercase: true,
      trim: true,
    },

    uid: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    cid:{
      type: String,
    },
    color: String,
    defaultVal: {
      type: Boolean,
      default: false
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("pipeline", pipelineSchema);
