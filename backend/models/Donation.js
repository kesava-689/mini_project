const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  address: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  foodType: { type: String, required: true },
  donorName: { type: String, required: true },
  isApproved: { type: Boolean, default: false }, // Admin approval status
  createdAt: { type: Date, default: Date.now },
  coordinates: {
    lat: { type: String, required: true },
    lon: { type: String, required: true },
  },
  assignedVolunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  distance: {
    type: Number, // in kilometers
    default: null,
  },
  pickupStatus: {
    type: String,
    enum: ['Pending', 'Picked Up', 'Delivered'],
    default: 'Pending'
  },
});

module.exports = mongoose.model("Donation", donationSchema);
