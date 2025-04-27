import "./ReceiverDashboard.css";

import React, { useState } from "react";
import DonationRequestForm from "./Pages/DonationRequestForm";
import MyRequests from "./Pages/MyRequests";
import ReceiverDashboardHome from "./Pages/ReceiverDashboardHome";
import FoodRequests from "./Pages/FoodRequests";
import ReceiverImpactReport from "./Pages/ReceiverImpactReport";
import VolunteerSchedule from "./Pages/VolunteerSchedule";
import { useNavigate } from "react-router-dom";
import UpdatePassword from "./Pages/EditProfile";

const ReceiverDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <ReceiverDashboardHome />;
      case "request-form":
        return <DonationRequestForm />
      case "foodrequest":
        return <FoodRequests/>;
      case "requests":
        return <MyRequests ngoId={"661deafde0d31a86e1a64a25"} />
      case "schedule":
        return <VolunteerSchedule />;
      case "profile":
        return <UpdatePassword/>;
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  return (
    <div className="Receiver-dashboard-wrapper">
      {/* Top Navbar */}
      <header className="dashboard-navbar">
        <h1>🎯 Receiver Dashboard</h1>
        <button onClick={() => navigate("/")} className="logout-btn">Logout</button>
      </header>

      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <ul>
            <li onClick={() => setActiveSection("home")}>Dashboard Home</li>
            <li onClick={() => setActiveSection("request-form")}>Donation Request Form</li>
            <li onClick={() => setActiveSection("foodrequest")}>Available Donations</li>
            <li onClick={() => setActiveSection("requests")}>My Requests</li>
            <li onClick={() => setActiveSection("schedule")}>Volunteer Schedule</li>
            <li onClick={() => setActiveSection("profile")}>Edit Profile</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ReceiverDashboard;
