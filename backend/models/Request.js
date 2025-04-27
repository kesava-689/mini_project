// models/Request.js
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  foodTitle: String,
  donorName: String,
  receiverName: String,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  // models/Request.js

donationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donation",
  },
  
  assignedVolunteer: {
    type: String, // or use mongoose.Schema.Types.ObjectId if referencing another model
    default: null,
  },
  // other fields...
});

module.exports = mongoose.model("Request", requestSchema);
