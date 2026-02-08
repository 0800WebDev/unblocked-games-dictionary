const express = require('express');
const router = express.Router();
const Like = require('../models/Like');
const { authenticateJWT } = require('../middleware/auth');

// Add or change a like/dislike
router.post('/', authenticateJWT, async (req, res) => {
  const { targetType, targetId, type } = req.body;
  const existing = await Like.findOne({ userId: req.user.id, targetType, targetId });

  if (existing) {
    existing.type = type;
    await existing.save();
    return res.json({ message: 'Updated!' });
  }

  const like = new Like({ userId: req.user.id, targetType, targetId, type });
  await like.save();
  res.json({ message: 'Saved!' });
});

// Get total likes/dislikes for a target
router.get('/:targetType/:targetId', async (req, res) => {
  const { targetType, targetId } = req.params;
  const likes = await Like.countDocuments({ targetType, targetId, type: 'like' });
  const dislikes = await Like.countDocuments({ targetType, targetId, type: 'dislike' });
  res.json({ likes, dislikes });
});

module.exports = router;
