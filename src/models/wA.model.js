// const mongoose = require("mongoose");

// const waSchema = new mongoose.Schema(
//   {
//     whatsappClientReady: {
//         type: Boolean,
//         default: false,
//     },
//     isConnected: {
//         type: Boolean,
//         default: false,
//     },
//     connectedPhoneNumber:{
//       type: String,
//       default: '',
//     },
 
//     cid:{
//       type: String,
//       required: true,
//       default:''
//     },
    
// }, {
//     timestamps: true 
// }
// );

// module.exports = mongoose.model("WA", waSchema);

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
    connectedPhoneNumber: {
      type: String,
      default: '',
      trim: true,  // Trim any extra spaces around the phone number
    },
    cid: {
      type: String,
      required: true,
      unique: true,  // Ensures only one entry per `cid`
      index: true,   // Adds an index for faster lookups
      trim: true,    // Trim spaces in case input has accidental whitespace
    },
  },
  {
    timestamps: true,  // Adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("WA", waSchema);
