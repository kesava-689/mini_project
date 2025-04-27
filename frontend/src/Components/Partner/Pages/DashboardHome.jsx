import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewDonations = () => {
  const [donations, setDonations] = useState([]);
  const donorName = localStorage.getItem("partnerName");

  const fetchMyDonations = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/donations/my-donations/${donorName}`);
      setDonations(res.data);
    } catch (err) {
      console.error("Error fetching your donations:", err);
    }
  };

  const cancelDonation = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this donation?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/donations/cancel/${id}`);
      alert("Donation cancelled successfully.");
      fetchMyDonations(); // Refresh
    } catch (err) {
      alert("Failed to cancel donation.");
    }
  };

  useEffect(() => {
    fetchMyDonations();
  }, []);

  return (
    <div className="view-donations-container">
      <h2>My Donations</h2>
      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <div className="donation-list">
          {donations.map((donation) => (
            <div className="donation-card" key={donation._id}>
              <h3>{donation.title}</h3>
              <p><strong>Description:</strong> {donation.description}</p>
              <p><strong>Quantity:</strong> {donation.quantity}</p>
              <p><strong>Pickup Address:</strong> {donation.address}</p>
              <p><strong>Expiry Date:</strong> {new Date(donation.expiryDate).toLocaleDateString()}</p>
              <p><strong>Type:</strong> {donation.foodType}</p>
              <p><strong>Status:</strong> 
                <span className={donation.isApproved ? "approved" : "pending"}>
                  {donation.isApproved ? "Approved" : "Pending"}
                </span>
              </p>

              {!donation.isApproved && (
                <button className="cancel-btn" onClick={() => cancelDonation(donation._id)}>
                  Cancel Donation
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewDonations;
