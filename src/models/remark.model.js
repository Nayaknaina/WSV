const mongoose = require("mongoose");

const remarkSchema = new mongoose.Schema(
  {
    text: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    cid:{
      type: String,
      required: true,
    },
    uid:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    lead_id:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
}, {
    timestamps: true 
}
);

module.exports = mongoose.model("remark", remarkSchema);
