const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const Donation = require('../models/Donation');  // Adjust the path based on your folder structure


// ✅ Controller to get pending requests for admin

// ✅ Get all pending requests
router.get("/admin/pending", async (req, res) => {
  try {
    const requests = await Request.find({ status: "Pending" });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending requests" });
  }
});

// ✅ Approve a request
router.put("/admin/approve/:id", async (req, res) => {
  try {
    await Request.findByIdAndUpdate(req.params.id, { status: "Approved" });
    res.status(200).json({ message: "Request approved" });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
});

// ❌ Reject a request
router.put("/admin/reject/:id", async (req, res) => {
  try {
    await Request.findByIdAndUpdate(req.params.id, { status: "Rejected" });
    res.status(200).json({ message: "Request rejected" });
  } catch (err) {
    res.status(500).json({ message: "Rejection failed" });
  }
  
});


// routes/requestRoutes.js
router.get("/volunteer-schedule/:receiverName", async (req, res) => {
    const { receiverName } = req.params;
    console.log("Receiver Name:", receiverName);

    try {
        // Find requests by receiverName
        const requests = await Request.find({ receiverName });

        if (requests.length === 0) {
            return res.status(404).json({ message: "No requests found for this receiver" });
        }

        // Log the requests to check if data is found
        console.log("Requests found:", requests);

        // For each request, find the corresponding donation based on foodTitle
        const populatedRequests = await Promise.all(
            requests.map(async (request) => {
                const donation = await Donation.findOne({ title: request.foodTitle })
                    .populate({
                        path: "assignedVolunteer",  // Populate the assigned volunteer
                        model: "User",  // Assuming "User" is the model for the volunteers
                    });

                // Log the populated donation data
                console.log("Populated Donation:", donation);

                // Add the donation details to the request
                return {
                    ...request.toObject(),
                    donation: donation || null,
                };
            })
        );

        // Log the populated requests
        console.log("Populated Requests:", populatedRequests);
        res.json(populatedRequests);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error fetching schedule" });
    }
});


// ✅ Fetch all requests for a specific receiver
router.get("/my-requests/:receiverName", async (req, res) => {
  const { receiverName } = req.params;

  try {
    const requests = await Request.find({ receiverName });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Error fetching requests" });
  }
});

module.exports = router;
