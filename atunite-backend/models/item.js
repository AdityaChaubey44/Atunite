// models/Item.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  sellerUSN: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  image: String, // (optional): can be image URL later
  datePosted: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', ItemSchema);