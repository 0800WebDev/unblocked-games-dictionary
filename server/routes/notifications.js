const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { authenticateJWT } = require('../middleware/auth');

// Get notifications for user
router.get('/', authenticateJWT, async (req,res) => {
  const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(notifications);
});

// Mark as read
router.post('/:id/read', authenticateJWT, async (req,res)=>{
  const notification = await Notification.findById(req.params.id);
  if(!notification) return res.status(404).json({message:'Not found'});
  notification.read = true;
  await notification.save();
  res.json({ message: 'Marked as read' });
});

module.exports = router;
