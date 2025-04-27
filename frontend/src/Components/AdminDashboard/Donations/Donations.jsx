import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for redirection
import "./Donations.css";

const Donations = () => {
  const navigate = useNavigate();
  const [pendingDonations, setPendingDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminName = localStorage.getItem("admin");
    if (adminName === "Sravani") {
      setIsAuthenticated(true);
      fetchDonations();
    } else {
      setIsAuthenticated(false);
      navigate("/admin-dashboard");
    }
  }, [navigate]);

  const fetchDonations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/pending-donations");
      setPendingDonations(res.data);
    } catch (err) {
      console.error("Error fetching donations:", err);
    }
  };

  const openAssignModal = (donation) => {
    setSelectedDonation(donation);
    setShowModal(true);
  };

  const handleAssign = async () => {
    if (!selectedDonation) {
      alert("No donation selected.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/admin/assign-volunteer/${selectedDonation._id}`
      );
      alert(res.data.message);
      setShowModal(false);
      fetchDonations();
    } catch (err) {
      console.error("Assignment Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong during assignment.");
    }
  };

  const approveDonation = async (donation) => {
    if (!donation.assignedVolunteer) {
      alert("Please assign a volunteer before approving.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/admin/approve/${donation._id}`);
      alert("Donation approved!");
      fetchDonations();
    } catch (err) {
      alert("Failed to approve donation.");
    }
  };

  const rejectDonation = async (id) => {
    const confirmReject = window.confirm("Are you sure you want to reject this donation?");
    if (!confirmReject) return;

    try {
      await axios.put(`http://localhost:5000/api/admin/reject/${id}`);
      alert("Donation rejected.");
      fetchDonations();
    } catch (err) {
      alert("Failed to reject donation.");
    }
  };

  if (!isAuthenticated) {
    return <h3>Access Denied. Only admin can access this page.</h3>;
  }

  return (
    <div className="donations-container">
      <h2>Pending Food Donations</h2>
      {pendingDonations.length === 0 ? (
        <p>No donations awaiting approval.</p>
      ) : (
        <div className="donations-grid">
          {pendingDonations.map((donation) => (
            <div className="donation-card" key={donation._id}>
              <h3>{donation.title}</h3>
              <p><strong>Description:</strong> {donation.description}</p>
              <p><strong>Quantity:</strong> {donation.quantity}</p>
              <p><strong>Address:</strong> {donation.address}</p>
              <p><strong>Expiry Date:</strong> {new Date(donation.expiryDate).toLocaleDateString()}</p>
              <p><strong>Type:</strong> {donation.foodType}</p>
              <p><strong>Donor:</strong> {donation.donorName}</p>
              <p><strong>Status:</strong> {donation.assignedVolunteer ? "Volunteer Assigned" : "Not Assigned"}</p>

              <div className="donation-actions">
                <button className="approve-btn" onClick={() => approveDonation(donation)}>Approve</button>
                <button className="reject-btn" onClick={() => rejectDonation(donation._id)}>Reject</button>
                <button onClick={() => openAssignModal(donation)}>Assign Volunteer</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal">
          <h3>Assign Volunteer to: {selectedDonation.title}</h3>
          <p>Nearest volunteer will be assigned automatically.</p>
          <div style={{ marginTop: "1rem" }}>
            <button onClick={handleAssign}>Assign</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donations;
