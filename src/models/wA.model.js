const mongoose = require("mongoose");

const waSchema = new mongoose.Schema(
  {
    whatsappClientReady: {
        type: Boolean,
        default: false,
    },
    isConnected: {
        type: Boolean,
        default: false,
    },
    connectedPhoneNumber:{
      type: String,
      default: '',
    },
 
    cid:{
      type: String,
      required: true,
      default:''
    },
    
}, {
    timestamps: true 
}
);

module.exports = mongoose.model("WA", waSchema);
