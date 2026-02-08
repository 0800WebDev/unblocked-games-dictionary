const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  role: { type: String, enum: ['normal','admin','owner'], default: 'normal' },
});

module.exports = mongoose.model('User', userSchema);
S