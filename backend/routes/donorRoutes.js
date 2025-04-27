const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

// Route to create a new donation
router.post("/create", async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    await newDonation.save();
    res.status(201).json({ message: "Donation submitted for admin approval." });
  } catch (err) {
    console.error("Error while creating donation:", err);
    res.status(500).json({ error: "Failed to donate food." });
  }
});

module.exports = router;
