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
  contact:{
    type:String,
    trim: true,
  },
  profilePicture: {
    type: String,
    trim: true, 
  },
  password: {
    type: String,
    required: function() { return !this.googleId; } 
  },
  address:{
    type:String,
    lowercase: true,
    trim: true,
  },
  city:{
    type:String,
    lowercase: true,
    trim: true,
  },
  state:{
    type:String,
    lowercase: true,
    trim: true,
  },
  country:{
    type:String,
    lowercase: true,
    trim: true
  }
});

// Define the model
const logIncollection = mongoose.model('logIncollection', logInSchema);

module.exports = logIncollection;