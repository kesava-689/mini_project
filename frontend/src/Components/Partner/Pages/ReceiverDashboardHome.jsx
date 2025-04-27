import './ReceiverDashboardHome.css';

import React from 'react';

const ReceiverDashboardHome = ({ setActiveSection }) => {
  const sections = [
    { name: "Dashboard Home", key: "home", description: "Overview of your dashboard activities" },
    { name: "Donation Request Form", key: "request-form", description: "Request food donations easily" },
    { name: "Available Donations", key: "foodrequest", description: "Browse and claim available donations" },
    { name: "My Requests", key: "requests", description: "Track your previous donation requests" },
    { name: "Volunteer Schedule", key: "schedule", description: "View and manage your volunteer timings" },
    { name: "Edit Profile", key: "profile", description: "Update your profile information" },
  ];

  return (
    <div className="receiver-dashboard-container">
      <h1 className="receiver-dashboard-title">Receiver Dashboard</h1>
      <div className="sections-grid">
        {sections.map((section) => (
          <div
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className="section-card"
          >
            <h2 className="section-title">{section.name}</h2>
            <p className="section-description">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiverDashboardHome;