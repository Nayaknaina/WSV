const mongoose = require("mongoose");
const logInSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true, 
  },
  cid:{
    type: String,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    max: 24
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  profilePicture: {
    type: String,
    trim: true, 
  },
  password: {
    type: String,
    required: function() { return !this.googleId; } 
  }
});

// Define the model
const logIncollection = mongoose.model('logIncollection', logInSchema);

module.exports = logIncollection;
