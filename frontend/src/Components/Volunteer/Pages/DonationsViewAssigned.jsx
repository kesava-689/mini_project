// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const VolunteerDashboard = () => {
//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     const fetchDonations = async () => {
//       const volunteerId = localStorage.getItem("volunteerId");
//       if (!volunteerId) return;

//       try {
//         const res = await axios.get(`http://localhost:5000/api/volunteer/assigned/${volunteerId}`);
//         setDonations(res.data);
//       } catch (err) {
//         console.error("Failed to fetch donations:", err);
//       }
//     };

//     fetchDonations();
//   }, []);

//   return (
//     <div>
//       <h2>Assigned Donations</h2>
//       {donations.length === 0 ? (
//         <p>No donations assigned yet.</p>
//       ) : (
//         <ul>
//           {donations.map((donation) => (
//             <li key={donation._id}>
//               <h3>{donation.title}</h3>
//               <p><strong>Description:</strong> {donation.description}</p>
//               <p><strong>Quantity:</strong> {donation.quantity}</p>
//               <p><strong>Pickup Address:</strong> {donation.address}</p>
//               <p><strong>Expiry Date:</strong> {new Date(donation.expiryDate).toLocaleDateString()}</p>
//               <p><strong>Type:</strong> {donation.foodType}</p>
//               <p><strong>Receiver Name:</strong> {donation.receiverName}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default VolunteerDashboard;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./DonationsViewAssigned.css";

// const VolunteerDashboard = () => {
//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     const fetchDonations = async () => {
//       const volunteerId = localStorage.getItem("volunteerId");
//       if (!volunteerId) return;

//       try {
//         const res = await axios.get(`http://localhost:5000/api/volunteer/assigned/${volunteerId}`);
//         setDonations(res.data);
//       } catch (err) {
//         console.error("Failed to fetch donations:", err);
//       }
//     };

//     fetchDonations();
//   }, []);

//   return (
//     <div className="volunteer-dashboard">
//       <h2>Assigned Donations</h2>
//       {donations.length === 0 ? (
//         <p className="no-donations">No donations assigned yet.</p>
//       ) : (
//         <ul className="donation-list">
//           {donations.map((donation) => (
//             <li key={donation._id} className="donation-item">
//               <h3>{donation.title}</h3>
//               <p><strong>Description:</strong> {donation.description}</p>
//               <p><strong>Quantity:</strong> {donation.quantity}</p>
//               <p><strong>Pickup Address:</strong> {donation.address}</p>
//               <p><strong>Expiry Date:</strong> {new Date(donation.expiryDate).toLocaleDateString()}</p>
//               <p><strong>Type:</strong> {donation.foodType}</p>
//               <p><strong>Receiver Name:</strong> {donation.receiverName}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default VolunteerDashboard;






import React, { useEffect, useState } from "react";
import axios from "axios";
import './DonationsViewAssigned.css'; // Updated CSS here

const DonationsViewAssigned = () => {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const volunteerId = localStorage.getItem("volunteerId");

  const fetchAssignedDonations = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/volunteer/assigned/${volunteerId}`);
      const donationsWithReceiverName = res.data.map((donation) => ({
        ...donation,
        receiverName: donation.receiverName || "Not Assigned",
      }));
      setDonations(donationsWithReceiverName);
    } catch (err) {
      console.error("Error fetching assigned donations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedDonations();
  }, []);

  return (
    <div className="donations-view-assigned-container">
      <h2 className="title">View Assigned Donations</h2>

      {isLoading ? (
        <p className="info-text">Loading donations...</p>
      ) : donations.length === 0 ? (
        <p className="info-text">No donations assigned yet.</p>
      ) : (
        <div className="donations-wrapper">
          {donations.map((donation) => (
            <div key={donation._id} className="donation-card">
              <div className="card-header">
                <h3>{donation.title}</h3>
              </div>
              <div className="card-body">
                <p><strong>Description:</strong> {donation.description}</p>
                <p><strong>Quantity:</strong> {donation.quantity}</p>
                <p><strong>Pickup Address:</strong> {donation.address}</p>
                <p><strong>Expiry Date:</strong> {new Date(donation.expiryDate).toLocaleDateString()}</p>
                <p><strong>Type:</strong> {donation.foodType}</p>
                <p><strong>Receiver:</strong> {donation.receiverName}</p>
                <p><strong>Status:</strong> <span className="status-text">{donation.pickupStatus}</span></p>
                {/* Add more fields here if needed */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationsViewAssigned;
