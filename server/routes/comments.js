const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { authenticateJWT } = require('../middleware/auth');

// Add a comment
router.post('/', authenticateJWT, async (req, res) => {
  const { targetType, targetId, text } = req.body;
  const comment = new Comment({ userId: req.user.id, targetType, targetId, text });
  await comment.save();
  res.json({ message: 'Comment added!', comment });
});

// Get comments for a target
router.get('/:targetType/:targetId', async (req,res) => {
  const { targetType, targetId } = req.params;
  const comments = await Comment.find({ targetType, targetId }).populate('userId', 'username').sort({ createdAt: -1 });
  res.json(comments);
});

module.exports = router;
