const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: 'member'
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    mobile:{
      type: String,
      default: "",
      trim: true,
    },
    countryCode:{
      type: String,
      lowercase: true,
      trim: true,
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
      trim:true,
      lowercase:true,
      required: true,
    },
    password:{
      type: String,
      required: true
    },
    profilePicture: {
      type: String,
      trim: true, 
      
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
