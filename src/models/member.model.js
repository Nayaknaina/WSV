const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: 'member'
    },
    name: {
      type: String,
    },
    cid: {
      type: String
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'logIncollection'
    },
    email: {
      type: String,
      unique:true,
      trime:true,
      lowercase:true,
      required: true,
    },
    password:{
      type: String,
      required: true
    },

    fcmToken: String,
    
    myleads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lead'
      },
    ],
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("teamMember", teamMemberSchema);
