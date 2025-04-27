const express = require("express");
const router = express.Router();
const User = require("../models/User"); // adjust path as needed


router.get("/role/:role", async (req, res) => {
    const { role } = req.params;
  
    try {
      let filter = { role, isApproved: true }; // Default: role + isapproved
  
      // Handle partner roles
  
      const users = await User.find(filter, "name email"); // Only return name & email
      res.json(users);
    } catch (err) {
      console.error("Error fetching users by role:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
  
module.exports = router;