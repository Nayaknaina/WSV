const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    company_id: {
      type: String
    },
    email: {
      type: String,
      unique:true,
      trime:true,
      lowercase:true,
    },

    leads: [
      {
        name: mongoose.Schema.ObjectId,
        ref: 'lead'
      },
    ],
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("teamMember", teamMemberSchema);
