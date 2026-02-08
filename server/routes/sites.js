const express = require('express');
const router = express.Router();
const Site = require('../models/Site');
const { authenticateJWT, authorizeRoles } = require('../middleware/auth'); // if you made auth middleware
const nodemailer = require('nodemailer');

// Submit a new site (normal user)
router.post('/submit', authenticateJWT, async (req, res) => {
  const { name, url, description } = req.body;

  const site = new Site({
    name,
    url,
    description,
    submittedBy: req.user.id
  });

  await site.save();

  // Send email to owner/admin
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.OWNER_EMAIL,
    subject: `New site submission: ${name}`,
    html: `<p>User ${req.user.id} submitted <strong>${name}</strong> (${url})</p>`
  });

  res.json({ message: 'Site submitted! Waiting for approval.' });
});

// Get pending sites (admin/owner only)
router.get('/pending', authenticateJWT, authorizeRoles('admin','owner'), async (req,res)=>{
  const sites = await Site.find({ approved: false }).populate('submittedBy');
  res.json(sites);
});

// Approve a site (admin/owner only)
router.post('/:siteId/approve', authenticateJWT, authorizeRoles('admin','owner'), async (req,res)=>{
  const site = await Site.findById(req.params.siteId);
  if(!site) return res.status(404).json({ message: 'Site not found' });
  site.approved = true;
  await site.save();
  res.json({ message: 'Approved!' });
});

module.exports = router;

const { authenticateJWT, authorizeRoles } = require('../middleware/auth'); // your auth middleware
const Site = require('../models/Site');

// Get all pending sites (admin/owner only)
router.get('/pending', authenticateJWT, authorizeRoles('admin','owner'), async (req, res) => {
  try {
    const pendingSites = await Site.find({ approved: false }).populate('submittedBy');
    res.json(pendingSites);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve a site (admin/owner only)
router.post('/:siteId/approve', authenticateJWT, authorizeRoles('admin','owner'), async (req, res) => {
  try {
    const site = await Site.findById(req.params.siteId);
    if (!site) return res.status(404).json({ message: 'Site not found' });

    site.approved = true;
    await site.save();

    res.json({ message: 'Site approved!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
