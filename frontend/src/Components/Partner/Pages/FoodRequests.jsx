import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FoodRequests.css";

const FoodRequests = () => {
  const [donations, setDonations] = useState([]);
  const receiverName = localStorage.getItem("partnerName"); // Make sure this is set during login

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/food-requests");
        setDonations(res.data);
      } catch (err) {
        console.error("Error fetching food requests:", err);
      }
    };
    fetchDonations();
  }, []);

  const handleRequestDonation = async (donorName, foodTitle) => {
    try {
      const res = await axios.post("http://localhost:5000/api/requests", {
        donorName,
        receiverName,
        foodTitle,
      });

      alert(res.data.message || "Request sent!");
    } catch (err) {
      console.error("Error requesting donation:", err);
      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="food-requests">
      <h2>Food Requests</h2>
      {donations.length === 0 ? (
        <p>No donations are available at the moment.</p>
      ) : (
        <ul>
          {donations.map((donation) => (
            <li key={donation._id} className="donation-item">
              <h3>{donation.title}</h3>
              <p>{donation.description}</p>
              <p>Status: {donation.pickupStatus}</p>
              <p>Donor: {donation.donorName}</p>
              <p>
                Volunteer Assigned:{" "}
                {donation.assignedVolunteer ? donation.assignedVolunteer.name : "Not Assigned"}
              </p>

              {(donation.pickupStatus === "Pending" ||  donation.pickupStatus==="Picked Up")&& (
                <button className="req-btn"
                  onClick={() => handleRequestDonation(donation.donorName, donation.title)}
                >
                  Request Donation
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FoodRequests;
