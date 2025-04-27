import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewPickupHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const volunteerId = localStorage.getItem("volunteerId");
      if (!volunteerId) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/volunteer/history/${volunteerId}`);
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Pickup History</h2>
      {history.length === 0 ? (
        <p>No history available yet.</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item._id}>
              <h3>{item.title}</h3>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Pickup Address:</strong> {item.address}</p>
              <p><strong>Expiry Date:</strong> {new Date(item.expiryDate).toLocaleDateString()}</p>
              <p><strong>Type:</strong> {item.foodType}</p>
              <p><strong>Status:</strong> {item.pickupStatus}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewPickupHistory;
