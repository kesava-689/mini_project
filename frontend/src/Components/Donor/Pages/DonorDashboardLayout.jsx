import "./DonorDashboardLayout.css";

import React, { useState } from "react";

const DonorDashboardLayout = ({ onSelect }) => {
  const [active, setActive] = useState("Donate Food");

  const functionalities = [
    "Donate Food",
    "View My Donations",
    "Edit Profile",
    "Notifications",
    "Messages / Chat",
    "History Export",
    "Logout",
  ];

  const handleSelect = (func) => {
    setActive(func);
    onSelect(func);
  };

  return (
    <div className="donor-sidebar">
      <h3>Donor Panel</h3>
      {functionalities.map((func, index) => (
        <button
          key={index}
          className={`sidebar-btn ${active === func ? "active" : ""}`}
          onClick={() => handleSelect(func)}
        >
          {func}
        </button>
      ))}
    </div>
  );
};

export default DonorDashboardLayout;
