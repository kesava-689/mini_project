import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyRequests.css";  // Assuming you have a CSS file for styling
import { color } from "framer-motion";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const receiverName = localStorage.getItem("partnerName"); // Assuming receiverName is saved in localStorage

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/requests/my-requests/${receiverName}`);
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };
    if (receiverName) {
      fetchRequests();
    }
  }, [receiverName]);

  return (
    <div className="my-requests">
      <h2>My Requests</h2>
      {requests.length === 0 ? (
        <p className="sub-heading">No requests have been made yet.</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request._id} className="request-item">
              <h3 style={{color:"black"}}>{request.foodTitle}</h3>
              <p>Donor: {request.donorName}</p>
              <p>Status: {request.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRequests;
