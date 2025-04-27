const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");
const PDFDocument = require("pdfkit");

// ✅ Get all donations by donorName
router.get("/my-donations/:donorName", async (req, res) => {
  try {
    const { donorName } = req.params;
    const donations = await Donation.find({ donorName }).sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (err) {
    console.error("Error fetching donor's donations:", err);
    res.status(500).json({ message: "Failed to fetch donations." });
  }
});

// ❌ Cancel unapproved donation
router.delete("/cancel/:id", async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found." });
    }

    if (donation.isApproved) {
      return res.status(403).json({ message: "Approved donations cannot be cancelled." });
    }

    await Donation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Donation cancelled successfully." });
  } catch (err) {
    console.error("Error cancelling donation:", err);
    res.status(500).json({ message: "Failed to cancel donation." });
  }
});

// 📄 Export donation history as PDF
router.get("/history/export/:donorName", async (req, res) => {
  const { donorName } = req.params;

  try {
    const donations = await Donation.find({ donorName });

    if (!donations || donations.length === 0) {
      return res.status(404).json({ message: "No donation history found." });
    }

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${donorName}_donation_history.pdf`);
    doc.pipe(res);

    doc.fontSize(20).text(`Donation History for ${donorName}`, { align: "center" });
    doc.moveDown();

    donations.forEach((donation, index) => {
      doc
        .fontSize(12)
        .text(`Donation #${index + 1}`, { underline: true })
        .text(`Title: ${donation.title}`)
        .text(`Description: ${donation.description}`)
        .text(`Quantity: ${donation.quantity}`)
        .text(`Food Type: ${donation.foodType}`)
        .text(`Pickup Address: ${donation.address}`)
        .text(`Expiry Date: ${new Date(donation.expiryDate).toDateString()}`)
        .text(`Created At: ${new Date(donation.createdAt).toDateString()}`)
        .text(`Status: ${donation.isApproved ? "Approved" : "Pending"}`)
        .moveDown();
    });

    doc.end();
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ message: "Error generating PDF" });
  }
});

module.exports = router;
