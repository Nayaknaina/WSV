const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    company_id: {
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

    leads: [
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
