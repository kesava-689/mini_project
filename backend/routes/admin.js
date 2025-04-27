const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Donation = require("../models/Donation");
const sendEmail = require("../utils/emailSender");

// -------------------- USER APPROVAL ROUTES -------------------- //

// Get all unapproved users
router.get("/pending-users", async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false });
    console.log("Fetched Pending Users: ", pendingUsers);
    res.status(200).json(pendingUsers);
  } catch (error) {
    console.error("Error fetching pending users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Approve user and send email
router.put("/approve-user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });

    if (user) {
      await sendEmail(
        user.email,
        "Account Approved 🎉",
        `Hi ${user.name},\n\nYour ${user.role} account has been approved! You can now log in and use our platform.\n\nThank you!`
      );
      res.json({ message: "User approved and notified via email.", user });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error approving user." });
  }
});

// Reject user and send email
router.delete("/reject-user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
      await sendEmail(
        user.email,
        "Account Rejected ❌",
        `Hi ${user.name},\n\nUnfortunately, your ${user.role} account has been rejected by the admin.\n\nFor more information, you may contact support.\n\nThank you.`
      );
      res.json({ message: "User rejected and notified via email." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error rejecting user." });
  }
});

// -------------------- DONATION APPROVAL ROUTES -------------------- //

// Get all unapproved donations
router.get("/pending-donations", async (req, res) => {
  try {
    const pendingDonations = await Donation.find({ isApproved: false });
    res.status(200).json(pendingDonations);
  } catch (err) {
    console.error("Error fetching pending donations:", err);
    res.status(500).json({ error: "Failed to get pending donations." });
  }
});

// Approve donation
router.put("/approve/:id", async (req, res) => {
  try {
    await Donation.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.status(200).json({ message: "Donation approved!" });
  } catch (err) {
    console.error("Error approving donation:", err);
    res.status(500).json({ error: "Failed to approve donation." });
  }
});

// Reject donation
router.put("/reject/:id", async (req, res) => {
  try {
    await Donation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Donation rejected and deleted!" });
  } catch (err) {
    console.error("Error rejecting donation:", err);
    res.status(500).json({ error: "Failed to reject donation." });
  }
});

module.exports = router;
