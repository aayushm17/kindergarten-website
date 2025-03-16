const express = require('express');
const router = express.Router();
const Contact = require('../models/contactSchema');

// Get Contact Information
router.get('/contact', async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) {
      return res.status(404).json({ message: "Contact details not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Contact Information
router.put('/contact', async (req, res) => {
  try {
    const { location, phone, email, socialLinks } = req.body;

    const updatedContact = await Contact.findOneAndUpdate(
      {},
      { location, phone, email, socialLinks },
      { new: true, upsert: true } // Create a new document if none exists
    );

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
