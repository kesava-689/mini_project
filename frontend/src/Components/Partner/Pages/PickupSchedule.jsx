import "./PickupSchedule.css";

import React, { useEffect, useState } from "react";

const PickupSchedule = ({ restaurantId }) => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/pickupschedule/${restaurantId}`);
        const data = await res.json();
  
        // If no real data, use dummy data
        if (!Array.isArray(data) || data.length === 0) {
          setSchedules(dummyData);
        } else {
          setSchedules(data);
        }
      } catch (err) {
        console.error("Error fetching pickup schedules:", err.message);
        setSchedules(dummyData); // fallback on error too
      }
    };
  
    fetchSchedules();
  }, [restaurantId]);
  
  const handleMarkPickedUp = (id) => {
    setSchedules((prev) =>
      prev.map((s) => (s._id === id ? { ...s, status: "Completed" } : s))
    );
  };

  return (
    <div className="pickup-schedule">
      <h2>Pickup Schedule</h2>

      {schedules.length === 0 ? (
        <p>No scheduled pickups yet.</p>
      ) : (
        <div className="pickup-list">
          {schedules.map((pickup) => (
            <div key={pickup._id} className={`pickup-card ${pickup.status.toLowerCase()}`}>
              <h3>{pickup.ngoName}</h3>
              <p><strong>Food:</strong> {pickup.foodType} ({pickup.quantity})</p>
              <p><strong>Time:</strong> {pickup.pickupTime}</p>
              <p><strong>Status:</strong> {pickup.status}</p>

              {pickup.status === "Scheduled" && (
                <button onClick={() => handleMarkPickedUp(pickup._id)} className="mark-btn">
                  Mark as Picked Up
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PickupSchedule;

const dummyData = [
    {
      _id: "demo1",
      restaurantId: "resto123",
      ngoName: "Food For All",
      foodType: "Rice & Dal",
      quantity: 40,
      pickupTime: "7:00 PM",
      notes: "Please ensure containers are sealed.",
      status: "Scheduled",
    },
    {
      _id: "demo2",
      restaurantId: "resto123",
      ngoName: "Care Givers",
      foodType: "Chapati & Sabzi",
      quantity: 25,
      pickupTime: "8:30 PM",
      notes: "",
      status: "Completed",
    }
  ];
  