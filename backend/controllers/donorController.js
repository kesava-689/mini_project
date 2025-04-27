const Donation = require("../models/Donation");

// POST /api/donations/create
exports.createDonation = async (req, res) => {
  try {
    const {
      title,
      description,
      quantity,
      address,
      expiryDate,
      foodType,
      donorName,
      coordinates, // ✅ include coordinates
    } = req.body;

    const newDonation = new Donation({
      title,
      description,
      quantity,
      address,
      expiryDate,
      foodType,
      donorName,
      coordinates, // ✅ assign coordinates
      isApproved: false,
    });

    await newDonation.save();
    res.status(201).json({ message: "Donation submitted and awaiting admin approval." });
  } catch (err) {
    console.error("Error while creating donation:", err);
    res.status(500).json({ message: "Failed to create donation." });
  }
};

