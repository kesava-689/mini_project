// routes/impactReport.js
const express = require("express");
const router = express.Router();

router.get("/:restaurantId", (req, res) => {
  const dummyReport = {
    totalDonations: 36,
    totalQuantity: 1280,
    ngosServed: 5,
    peopleFed: 1280,
    pickupHistory: [
      { date: "2025-04-10", ngo: "Hope Foundation", food: "Rice & Curry", quantity: 120 },
      { date: "2025-04-05", ngo: "Feeding India", food: "Veg Biryani", quantity: 150 },
      { date: "2025-03-29", ngo: "Food Angels", food: "Chapati", quantity: 200 },
    ],
  };

  res.json(dummyReport);
});

module.exports = router;