import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminVolunteerUpdates.css";

const AdminVolunteerUpdates = () => {
  const [donations, setDonations] = useState([]);
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/volunteer-updates");
        console.log("Donations Response:", res.data);  // <== ADD THIS LINE
        setDonations(res.data);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    };
    fetchDonations();
  }, []);
  
  return (
    <div className="admin-section">
      <h2>Volunteer Updates</h2>
      {donations.length === 0 ? (
        <p>No donations assigned to volunteers yet.</p>
      ) : (
        <table className="volunteer-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Donor</th>
              <th>Volunteer Name</th>
              <th>Volunteer Email</th>
              <th>Pickup Status</th>
              <th>Location</th>
              <th>Distance (km)</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td data-label="Title">{donation.title}</td>
<td data-label="Donor">{donation.donorName}</td>
<td data-label="Volunteer Name">{donation.assignedVolunteer?.name || "N/A"}</td>
<td data-label="Volunteer Email">{donation.assignedVolunteer?.email || "N/A"}</td>
<td data-label="Pickup Status">{donation.pickupStatus}</td>
<td data-label="Location">{donation.assignedVolunteer?.location || "N/A"}</td>
<td data-label="Distance (km)">{donation.distance?.toFixed(2) || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminVolunteerUpdates;
