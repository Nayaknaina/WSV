const mongoose = require("mongoose");
const mongoUri = "mongodb+srv://nainanayak288:Dkccg5NaZMANqu7F@wsvconnect.bpxfx.mongodb.net/";
// const mongoUri = "mongodb://localhost:27017/WSV";

mongoose.connect(mongoUri, {
  connectTimeoutMS: 30000
}).then(() => {
  console.log(`Connection Successful:)`);
}).catch((e) => {
  console.log(`No connection`);
});


const logInSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true, 
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
