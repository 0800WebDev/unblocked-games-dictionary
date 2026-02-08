const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  name: String,
  url: String,
  description: String,
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Site', siteSchema);
