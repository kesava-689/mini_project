const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Save contact
router.post('/save', async (req, res) => {
  try {
    const { name, phone, message } = req.body;
    const newContact = new Contact({ name, phone, message });
    await newContact.save();
    res.status(201).json({ success: true, message: 'Contact saved' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving contact', error });
  }
});

// View all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contacts', error });
  }
});

module.exports = router;
