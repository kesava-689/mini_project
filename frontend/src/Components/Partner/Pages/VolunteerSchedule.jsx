// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./VolunteerSchedule.css";

// const VolunteerSchedule = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [receiverName, setReceiverName] = useState("");

//   useEffect(() => {
//     const nameFromStorage = localStorage.getItem("partnerName");
//     if (nameFromStorage) {
//       setReceiverName(nameFromStorage);
//     } else {
//       console.warn("partnerName not found in localStorage.");
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchSchedule = async () => {
//       try {
//         if (!receiverName) return;

//         const response = await axios.get(
//           `http://localhost:5000/api/requests/volunteer-schedule/${receiverName}`
//         );
//         console.log("Fetched schedule data:", response.data);
//         setRequests(response.data);
//       } catch (error) {
//         console.error("Error fetching volunteer schedule:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSchedule();
//   }, [receiverName]);

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-heading">Volunteer Schedule</h2>

//       {loading ? (
//         <p className="text-subheading">Loading schedule...</p>
//       ) : requests.length === 0 ? (
//         <p className="text-subheading">No requests found for you.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {requests.map((item) => {
//             const donation = item.donation || {};  // Get the donation data for the request
//             const assignedVolunteer = donation.assignedVolunteer || {};  // Get the assigned volunteer

//             return (
//               <div key={item._id} className="border rounded-2xl p-4 shadow-lg bg-white">
//                 <h3 className="text-xl font-semibold mb-2 text-green-700">
//                   {donation.title || "No Title"}
//                 </h3>
//                 <p><strong>Description:</strong> {donation.description || "Not Provided"}</p>
//                 <p><strong>Quantity:</strong> {donation.quantity || "N/A"}</p>
//                 <p><strong>Address:</strong> {donation.address || "N/A"}</p>
//                 <p><strong>Expiry Date:</strong> 
//                   {donation.expiryDate 
//                     ? new Date(donation.expiryDate).toLocaleDateString() 
//                     : "Not Available"}
//                 </p>
//                 <p><strong>Pickup Status:</strong> {donation.pickupStatus || "N/A"}</p>
//                 <p className="mt-2 font-medium text-indigo-600">
//                   <strong>Volunteer Assigned:</strong>{" "}
//                   {assignedVolunteer.name || "Not yet assigned"}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VolunteerSchedule;



import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VolunteerSchedule.css";

const VolunteerSchedule = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [receiverName, setReceiverName] = useState("");

  useEffect(() => {
    const nameFromStorage = localStorage.getItem("partnerName");
    if (nameFromStorage) {
      setReceiverName(nameFromStorage);
    } else {
      console.warn("partnerName not found in localStorage.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        if (!receiverName) return;

        const response = await axios.get(
          `http://localhost:5000/api/requests/volunteer-schedule/${receiverName}`
        );
        console.log("Fetched schedule data:", response.data);
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching volunteer schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [receiverName]);

  return (
    <div className="schedule-container">
      <h2 className="heading">Volunteer Schedule</h2>

      {loading ? (
        <p className="loading-text">Loading schedule...</p>
      ) : requests.length === 0 ? (
        <p className="no-requests">No requests found for you.</p>
      ) : (
        <div className="schedule-grid">
          {requests.map((item) => {
            const donation = item.donation || {};  // Get the donation data for the request
            const assignedVolunteer = donation.assignedVolunteer || {};  // Get the assigned volunteer

            return (
              <div key={item._id} className="donation-card">
                <h3 className="donation-title">
                  {donation.title || "No Title"}
                </h3>
                <p><strong>Description:</strong> {donation.description || "Not Provided"}</p>
                <p><strong>Quantity:</strong> {donation.quantity || "N/A"}</p>
                <p><strong>Address:</strong> {donation.address || "N/A"}</p>
                <p><strong>Expiry Date:</strong> 
                  {donation.expiryDate 
                    ? new Date(donation.expiryDate).toLocaleDateString() 
                    : "Not Available"}
                </p>
                <p><strong>Pickup Status:</strong> {donation.pickupStatus || "N/A"}</p>
                <p className="volunteer-info">
                  <strong>Volunteer Assigned:</strong>{" "}
                  {assignedVolunteer.name || "Not yet assigned"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VolunteerSchedule;

