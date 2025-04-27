const express = require("express");
const router = express.Router();
const {
  getAssignedDonations,
  updatePickupStatus
} = require("../controllers/volunteerController");

router.get("/assigned/:volunteerId", getAssignedDonations);

// ✨ Route for updating pickup status
router.put("/update-pickup-status/:donationId", updatePickupStatus);

module.exports = router;
