const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: { type: String, enum: ['site', 'game', 'post'], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: { type: String, enum: ['like', 'dislike'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Like', likeSchema);
