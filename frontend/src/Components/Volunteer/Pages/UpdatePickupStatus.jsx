// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './UpdatePickupStatus.css'; // Import your custom CSS file

// const UpdatePickupStatus = () => {
//   const [donations, setDonations] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const volunteerId = localStorage.getItem("volunteerId");

//   const fetchAssignedDonations = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/api/volunteer/assigned/${volunteerId}`);
//       const donationsWithReceiverName = res.data.map((donation) => ({
//         ...donation,
//         receiverName: donation.receiverName || "Not Assigned" // Ensure receiverName is set
//       }));
//       setDonations(donationsWithReceiverName); // Store donations with receiverName
//     } catch (err) {
//       console.error("Error fetching assigned donations:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleStatusChange = async (donationId, newStatus, receiverName) => {
//     console.log(`Updating donation: ${donationId}, to status: ${newStatus}, receiver: ${receiverName}`);
  
//     // Restrict ONLY if Delivered is selected and no receiver
//     if (newStatus === "Delivered" && (receiverName === "Not Assigned")) {
//       alert("Cannot mark as 'Delivered' because no receiver is assigned.");
//       return;
//     }
  
//     try {
//       await axios.put(`http://localhost:5000/api/volunteer/update-pickup-status/${donationId}`, {
//         newStatus: newStatus,  // explicitly pass key and value
//       });
//       fetchAssignedDonations();
//     } catch (err) {
//       console.error("Error updating pickup status:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Error updating pickup status");
//     }
//   };
  
//   useEffect(() => {
//     fetchAssignedDonations();
//   }, []);

//   return (
//     <div className="update-pickup-status-container">
//       <h2 className="title">My Assigned Donations</h2>

//       {isLoading ? (
//         <p className="loading">Loading donations...</p>
//       ) : donations.length === 0 ? (
//         <p className="no-donations">No donations assigned.</p>
//       ) : (
//         <div className="donation-cards">
//           {donations.map((donation) => (
//             <div key={donation._id} className="donation-card">
//               <h3 className="donation-title">{donation.title}</h3>
//               <p className="donation-description">{donation.description}</p>
//               <p className="status">
//                 <strong>Status:</strong> <span className="status-value">{donation.pickupStatus}</span>
//               </p>

//               <label className="status-label">Update Status:</label>
//               <select
//                 value={donation.pickupStatus}
//                 onChange={(e) => handleStatusChange(donation._id, e.target.value, donation.receiverName)}
//                 className="status-dropdown"
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Picked Up">Picked Up</option>
//                 <option value="Delivered">Delivered</option>
//               </select>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdatePickupStatus;




import React, { useEffect, useState } from "react";
import axios from "axios";
import './UpdatePickupStatus.css';

const UpdatePickupStatus = () => {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const volunteerId = localStorage.getItem("volunteerId");

  const fetchAssignedDonations = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/volunteer/assigned/${volunteerId}`);
      const donationsWithReceiverName = res.data.map((donation) => ({
        ...donation,
        receiverName: donation.receiverName || "Not Assigned"
      }));
      setDonations(donationsWithReceiverName);
    } catch (err) {
      console.error("Error fetching assigned donations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (donationId, newStatus, receiverName) => {
    if (newStatus === "Delivered" && receiverName === "Not Assigned") {
      alert("Cannot mark as 'Delivered' because no receiver is assigned.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/volunteer/update-pickup-status/${donationId}`, {
        newStatus: newStatus,
      });
      fetchAssignedDonations();
    } catch (err) {
      console.error("Error updating pickup status:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error updating pickup status");
    }
  };

  useEffect(() => {
    fetchAssignedDonations();
  }, []);

  return (
    <div className="update-pickup-status-container">
      <h2 className="title">My Assigned Donations</h2>

      {isLoading ? (
        <p className="info-text">Loading donations...</p>
      ) : donations.length === 0 ? (
        <p className="info-text">No donations assigned.</p>
      ) : (
        <div className="donation-card-wrapper">
          {donations.map((donation) => (
            <div key={donation._id} className="donation-card">
              <div className="card-header">
                <h3>{donation.title}</h3>
              </div>
              <div className="card-body">
                <p><strong>Description:</strong> {donation.description}</p>
                <p><strong>Receiver:</strong> {donation.receiverName}</p>
                <p><strong>Current Status:</strong> <span className="status-text">{donation.pickupStatus}</span></p>

                <label htmlFor={`status-${donation._id}`}>Update Status</label>
                <select
                  id={`status-${donation._id}`}
                  value={donation.pickupStatus}
                  onChange={(e) => handleStatusChange(donation._id, e.target.value, donation.receiverName)}
                  className="status-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Picked Up">Picked Up</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdatePickupStatus;
