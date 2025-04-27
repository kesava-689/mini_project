// routes/donationRequests.js
const express = require("express");
const router = express.Router();
const DonationRequest = require("../models/DonationRequest"); // ✅ model needed

// GET all requests for a restaurant
router.get("/:restaurantId", async (req, res) => {
  try {
    const requests = await DonationRequest.find({
      restaurantId: req.params.restaurantId,
    });

    res.json(requests); // ✅ make sure it's an array
  } catch (err) {
    console.error("Failed to fetch donation requests:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;