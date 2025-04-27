const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { assignVolunteer } = require("../controllers/adminController");
const Donation = require("../models/Donation");


router.post("/assign-volunteer/:id", assignVolunteer);


router.get('/dashboard', async (req, res) => {
    try {
      // Get total number of volunteers, donors, and partners based on roles
      const volunteers = await User.find({ role: 'volunteer',isApproved:true });
      const donors = await User.find({ role: 'donor',isApproved:true });
      const partners = await User.find({ role: 'partnership',isApproved:true }); // Updated role name for partners
      
      // Get names for each role
      const volunteerNames = volunteers.map((volunteer) => volunteer.name);
      const donorNames = donors.map((donor) => donor.name);
      const partnerNames = partners.map((partner) => partner.name);
  
      res.status(200).json({
        totalVolunteers: volunteers.length,
        totalDonors: donors.length,
        totalPartners: partners.length,
        volunteerNames,
        donorNames,
        partnerNames
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });
  
// Get donations where a volunteer is assigned
router.get("/volunteer-updates", async (req, res) => {
  try {
    const donations = await Donation.find({ assignedVolunteer: { $ne: null } })
      .populate("assignedVolunteer", "name email coordinates location"); // Get volunteer info

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching assigned donations:", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});


module.exports = router;
