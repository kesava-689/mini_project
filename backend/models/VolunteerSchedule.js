const mongoose = require("mongoose");

const VolunteerScheduleSchema = new mongoose.Schema({
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  donationId: { type: mongoose.Schema.Types.ObjectId, ref: "PRDonation", required: true },
  pickupTime: { type: String, required: true },
  status: { type: String, default: "Scheduled" }, // Scheduled, PickedUp, Delayed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("VolunteerSchedule", VolunteerScheduleSchema);