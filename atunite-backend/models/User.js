// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  usn: {
    type: String,
    required: true,
    unique: true
  },
  dob: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    default: 0
  },
  rewardClaimedMonth: {
    type: Number,
    default: null
  }
});

module.exports = mongoose.model('User', UserSchema);