import "./VolunteerDashboardLayout.css";

import React from "react";

const DonorDashboardLayout = ({ onSelect, selected }) => {
  const functionalities = [
    "DonationsView Assigned",
    "Update Pickup Status",
    "Notifications",
    "Edit Profile",
    "Messages / Chat",
    "Logout",
  ];

  return (
    <div className="volunteer-sidebar">
      <h3>Volunteer Panel</h3>
      {functionalities.map((func, index) => (
        <button
          key={index}
          className={`sidebar-btn ${selected === func ? "active" : ""}`}
          onClick={() => onSelect(func)}
        >
          {func}
        </button>
      ))}
    </div>
  );
};

export default DonorDashboardLayout;