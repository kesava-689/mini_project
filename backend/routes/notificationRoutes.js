const express = require('express');
const Notification = require('../models/Notification');
const router = express.Router();

// Fetch notifications for a specific donor by name
// GET notifications for both donor and volunteer by name and role
router.get('/:role/:name', async (req, res) => {
    try {
      const { role, name } = req.params;
      const notifications = await Notification.find({ role, recipientName: name });
      res.status(200).json(notifications);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      res.status(500).json({ message: 'Error fetching notifications' });
    }
  });
  

// Mark notification as read
router.put('/read/:id', async (req, res) => {
    try {
      const notification = await Notification.findByIdAndUpdate(
        req.params.id,
        { read: true },
        { new: true }
      );
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      res.status(200).json(notification);
    } catch (err) {
      console.error('Error updating notification:', err);
      res.status(500).json({ message: 'Error updating notification' });
    }
  });
  

module.exports = router;
