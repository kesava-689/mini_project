const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Update password by donor name
router.put("/update-password", async (req, res) => {
  const { donorName, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ name: donorName });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect old password" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
