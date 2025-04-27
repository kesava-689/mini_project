const express = require("express");
const router = express.Router();

router.get("/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;

  // Dummy response for testing
  const stats = {
    totalDonations: 120,
    completedPickups: 90,
    upcomingPickups: 5,
    categoryStats: [
      { _id: "Vegetables", count: 25 },
      { _id: "Fruits", count: 30 },
      { _id: "Grains", count: 20 },
      { _id: "food", count: 14 },
      { _id: "pastha", count: 31 },
      { _id: "Groceries", count: 22 },
    ],
    monthlyStats: [
      { _id: "Jan", count: 10 },
      { _id: "Feb", count: 20 },
      { _id: "Mar", count: 30 },
      { _id: "Apr", count: 10 },
      { _id: "May", count: 20 },
      { _id: "June", count: 30 },
      { _id: "July", count: 20 },
      { _id: "Aug", count: 30 },
      { _id: "Sep", count: 30 },
    ],
  };

  res.json(stats);
});

module.exports = router;