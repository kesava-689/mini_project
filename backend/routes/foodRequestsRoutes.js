const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");
const Request = require("../models/Request"); // Ensure this import path is correct

// ✅ Existing Route: Get all donations with status 'Pending' or 'Picked Up'
router.get("/food-requests", async (req, res) => {
  try {
    const donations = await Donation.find({
      pickupStatus: { $in: ["Pending", "Picked Up"] }
    }).populate("assignedVolunteer", "name");

    res.status(200).json(donations);
  } catch (err) {
    console.error("Error fetching food requests:", err);
    res.status(500).json({ message: "Error fetching food requests" });
  }
});

// ✅ New Route: Request a donation by receiver
router.post("/requests", async (req, res) => {
  const { donorName, receiverName, foodTitle } = req.body;

  try {
    // Check if already requested
    const existingRequest = await Request.findOne({ donorName, receiverName, foodTitle });
    if (existingRequest) {
      return res.status(400).json({ message: "You already requested this donation." });
    }

    const newRequest = new Request({
      donorName,
      receiverName,
      foodTitle,
      status: "Pending"
    });

    await newRequest.save();
    res.status(201).json({ message: "Request sent successfully!" });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ message: "Failed to send request." });
  }
});


module.exports = router;
