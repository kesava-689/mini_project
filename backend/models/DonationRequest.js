// models/DonationRequest.js
const mongoose = require("mongoose");

const donationRequestSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  donorName: { type: String, required: true },
  donorEmail: { type: String, required: true },
  foodType: { type: String, required: true },
  amountNeeded: { type: Number, required: true },
  reason: { type: String, required: true },
  contactNumber: { type: String, required: true },
  requestedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DonationRequest", donationRequestSchema);
