const mongoose = require('mongoose');

// Mongoose Schema definition
const pageSchema = new mongoose.Schema({
  cid: {
    type: String,
    required: true,  // cid required 
    trim: true
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "logIncollection",
    require: true,
  },
  pageToken: {
    type: String,
    required: true,  // pageToken required 
    trim: true
  },
  pageName: {
    type: String,
    required: true,  // pageToken required 
    trim: true,
  },
  pageId: {
    type: String,
    required: true,  // pageId required h
    trim: true
  },

  forms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'form'
  }],
  totalForms:{
    type: Number,
    default: 0,
  },
  permitted:{
    type: Boolean,
    default: true,
  }

}, { timestamps: true });  

// Mongoose Model
const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
