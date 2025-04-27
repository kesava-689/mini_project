import React, { useEffect, useState } from "react";
import axios from "axios";
import './ViewRequests.css';

const ViewRequests = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/donation-request");
        setDonationRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donation requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <div>Loading donation requests...</div>;
  }

  return (
    <div className="view-requests">
      <h2>Donation Requests</h2>
      {donationRequests.length === 0 ? (
        <p>No donation requests found.</p>
      ) : (
        <table className="requests-table">
          <thead>
            <tr>
              <th>Organization Name</th>
              <th>Donor Name</th>
              <th>Email</th>
              <th>Food Type</th>
              <th>Amount Needed</th>
              <th>Reason</th>
              <th>Contact Number</th>
              <th>Requested At</th>
            </tr>
          </thead>
          <tbody>
          {donationRequests.map((request) => (
          <tr key={request._id}>
            <td data-label="Organization Name">{request.organizationName}</td>
            <td data-label="Donor Name">{request.donorName}</td>
            <td data-label="Email">{request.donorEmail}</td>
            <td data-label="Food Type">{request.foodType}</td>
            <td data-label="Amount Needed">{request.amountNeeded}</td>
            <td data-label="Reason">{request.reason}</td>
            <td data-label="Contact Number">{request.contactNumber}</td>
            <td data-label="Requested At">
            {new Date(request.requestedAt).toLocaleString()}
            </td>
          </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
};

export default ViewRequests;
