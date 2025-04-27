const mongoose = require("mongoose");
const Donation = require("../models/Donation");
const Request = require("../models/Request");
const sendNotification = require("../utils/notification"); // This function will handle notification sending
const sendMail = require("../config/email");
const User = require("../models/User");  // Add this line if missing


// Get all donations assigned to a volunteer
exports.getAssignedDonations = async (req, res) => {
  const { volunteerId } = req.params;

  try {
    // Find all donations assigned to this volunteer
    const donations = await Donation.find({ assignedVolunteer: volunteerId });

    // For each donation, find the matching request (based on title and donorName)
    const donationsWithReceiver = await Promise.all(
      donations.map(async (donation) => {
        const matchingRequest = await Request.findOne({
          foodTitle: donation.title,
          donorName: donation.donorName,
        });

        return {
          ...donation.toObject(),
          receiverName: matchingRequest ? matchingRequest.receiverName : "Not Assigned"
        };
      })
    );

    res.json(donationsWithReceiver);
  } catch (error) {
    console.error("Error fetching assigned donations:", error);
    res.status(500).json({ error: "Failed to fetch assigned donations" });
  }
};


// exports.updatePickupStatus = async (req, res) => {
//   const { donationId } = req.params;
//   const { newStatus } = req.body;

//   if (!donationId || !newStatus) {
//     return res.status(400).json({ message: "Donation ID and newStatus are required" });
//   }

//   try {
//     const donation = await Donation.findById(donationId);

//     if (!donation) {
//       return res.status(404).json({ message: "Donation not found" });
//     }

//     // Restrict Delivered status only if receiverName is not assigned
//     if (newStatus === "Delivered" && (donation.receiverName === "Not Assigned")) {
//       return res.status(400).json({ message: "Cannot mark as 'Delivered' because no receiver is assigned." });
//     }

//     donation.pickupStatus = newStatus;
//     await donation.save();

//     res.status(200).json({ message: "Status updated successfully", donation });
//   } catch (err) {
//     console.error("Server error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



exports.updatePickupStatus = async (req, res) => {
  const { donationId } = req.params;
  const { newStatus } = req.body;

  if (!donationId || !newStatus) {
    return res.status(400).json({ message: "Donation ID and newStatus are required" });
  }

  try {
    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // Restrict Delivered status only if receiverName is not assigned
    if (newStatus === "Delivered" && donation.receiverName === "Not Assigned") {
      return res.status(400).json({ message: "Cannot mark as 'Delivered' because no receiver is assigned." });
    }

    donation.pickupStatus = newStatus;
    await donation.save();

    // If status is 'Picked Up' or 'Delivered', notify the admin
    if (newStatus === "Picked Up" || newStatus === "Delivered") {
      const admin = await User.findOne({ role: "admin" });
      if (admin) {
        // Send notification to the admin
        await sendNotification(
          admin.username, // Assuming admin's username or email for identification
          `Donation "${donation.title}" has been ${newStatus}.`,
          "admin"
        );
      }
    }

    res.status(200).json({ message: "Status updated successfully", donation });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
};