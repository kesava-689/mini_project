// routes/donationRequestRoutes.js
const express = require("express");
const router = express.Router();
const DonationRequest = require("../models/DonationRequest");

// POST - create a new donation request
router.post("/", async (req, res) => {
  const {
    organizationName,
    donorName,
    donorEmail,
    foodType,
    amountNeeded,
    reason,
    contactNumber,
  } = req.body;

  try {
    const newRequest = new DonationRequest({
      organizationName,
      donorName,
      donorEmail,
      foodType,
      amountNeeded,
      reason,
      contactNumber,
    });

    await newRequest.save();
    res.status(201).json({ message: "Donation request saved successfully", newRequest });
  } catch (error) {
    console.error("Error saving donation request:", error);
    res.status(500).json({ error: "Failed to save donation request" });
  }
});

router.get("/", async (req, res) => {
    try {
      const donationRequests = await DonationRequest.find();
      res.status(200).json(donationRequests);
    } catch (error) {
      console.error("Error fetching donation requests:", error);
      res.status(500).json({ error: "Failed to fetch donation requests" });
    }
  });
  
module.exports = router;
