// Import required modules
const Donation = require("../models/Donation");
const sendMail = require("../config/email");
const getDrivingDistance = require("../utils/distance"); // Ensure this file contains the distance calculation logic
const User = require("../models/User");
const sendNotification = require("../utils/notification");

const getApprovedVolunteers = async () => {
  return await User.find({ role: "volunteer", isApproved: true, coordinates: { $ne: null } });
};

const { getCoordinatesFromAddress } = require("../utils/geocode");

exports.createDonation = async (req, res) => {
    try {
      const { title, description, quantity, address, expiryDate, foodType, donorName } = req.body;
  
      const coordinates = await getCoordinatesFromAddress(address);
  
      const newDonation = new Donation({
        title,
        description,
        quantity,
        address,
        expiryDate,
        foodType,
        donorName,
        isApproved: false,
        coordinates,  // add this
      });
  
      await newDonation.save();
      res.status(201).json({ message: "Donation submitted and awaiting admin approval." });
    } catch (err) {
      console.error("Error while creating donation:", err);
      res.status(500).json({ message: "Failed to create donation." });
    }
  };
  

  exports.assignVolunteer = async (req, res) => {
    try {
      const donationId = req.params.id;
      const donation = await Donation.findById(donationId);
      if (!donation) return res.status(404).json({ message: "Donation not found" });
  
      const volunteers = await getApprovedVolunteers();
      let shortest = { distance: Infinity, volunteer: null };
  
      // ✅ Debug logs
      console.log("Donation Coordinates:", donation.coordinates);
  
      for (let volunteer of volunteers) {
        console.log(`Checking volunteer ${volunteer.name} with coordinates:`, volunteer.coordinates);
  
        if (volunteer.coordinates?.lat && volunteer.coordinates?.lon && donation.coordinates?.lat && donation.coordinates?.lon) {
          const distance = await getDrivingDistance(
            { lat: volunteer.coordinates.lat, lon: volunteer.coordinates.lon },
            { lat: donation.coordinates.lat, lon: donation.coordinates.lon }
          );
  
          console.log(`Distance from ${volunteer.name} to donation: ${distance} km`);
  
          if (distance < shortest.distance) {
            shortest = { distance, volunteer: volunteer };
          }
        } else {
          console.log("Skipping volunteer due to missing coordinates:", volunteer.name);
        }
      }
  
      if (!shortest.volunteer) return res.status(400).json({ message: "No volunteers with valid location found" });
  
      donation.assignedVolunteer = shortest.volunteer._id;
      donation.distance = shortest.distance;
      donation.isApproved = true;
      await donation.save();
  
      // Send email to the volunteer
      await sendMail(
        shortest.volunteer.email,
        "You've been assigned a food pickup!",
        `Dear ${shortest.volunteer.name},\n\nYou have been assigned to pick up the donation: ${donation.title} from ${donation.address}.\n\nThank you!`
      );
  
      // Send notifications to both the donor and volunteer
      // Notification to donor about approval
      try {
        await sendNotification(
          donation.donorName,
          `Your donation "${donation.title}" has been approved and a volunteer has been assigned to pick it up.`,
          "donor"
        );
        await sendNotification(
          shortest.volunteer.name,
          `You have been assigned to pick up "${donation.title}" from ${donation.address}.`,
          "volunteer"
        );
        
        console.log("Notification sent successfully to donor:", donation.donorName);
      } catch (error) {
        console.error("Error sending notification to donor:", error.message);
      }
      
      res.json({ message: "Volunteer assigned and donation approved!", donation });
    } catch (error) {
      console.error("Assignment Error:", error);
      res.status(500).json({ message: "Something went wrong." });
    }
};
