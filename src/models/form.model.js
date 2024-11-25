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
  pageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'page'
  },
  formName: {
    type: String,
    required: true,  // pageId required h
    trim: true
  },

  formId: {
    type: String,
    required: true,  // pageId required h
    trim: true
  },
  totalLeads:{
    type: Number,
    default: 0,
  },
  permitted:{
    type: Boolean,
    default: true,
  }

}, { timestamps: true });  

// Mongoose Model
const Page = mongoose.model('form', pageSchema);

module.exports = Page;
