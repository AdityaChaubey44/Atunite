// models/LostItem.js
const mongoose = require('mongoose');

const LostItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  description: String,
  isFound: {
    type: Boolean,
    default: false
  },
  reportedByUSN: {
    type: String,
    required: true
  },
  finderUSN: {
    type: String,
    default: null
  },
  image: String,
  rewardGiven: {
    type: Boolean,
    default: false
  },
  dateReported: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LostItem', LostItemSchema);