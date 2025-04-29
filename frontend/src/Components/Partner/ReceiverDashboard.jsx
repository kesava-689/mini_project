import "./ReceiverDashboard.css";

import React, { useState } from "react";

import DonationRequestForm from "./Pages/DonationRequestForm";
import FoodRequests from "./Pages/FoodRequests";
import MyRequests from "./Pages/MyRequests";
import ReceiverDashboardHome from "./Pages/ReceiverDashboardHome";
import UpdatePassword from "./Pages/EditProfile";
import VolunteerSchedule from "./Pages/VolunteerSchedule";
// Import the menu icon using ES6 import
import menuIcon from "../../assets/menu.png";
import { useNavigate } from "react-router-dom";

const ReceiverDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar visibility

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <ReceiverDashboardHome />;
      case "request-form":
        return <DonationRequestForm />;
      case "foodrequest":
        return <FoodRequests />;
      case "requests":
        return <MyRequests ngoId={"661deafde0d31a86e1a64a25"} />;
      case "schedule":
        return <VolunteerSchedule />;
      case "profile":
        return <UpdatePassword />;
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility on mobile
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar when a section is selected
  };

  return (
    <div className="Receiver-dashboard-wrapper">
      {/* Top Navbar */}
      <header className="dashboard-navbar">
        <div className="navbar-left">
          {/* Menu Icon */}
          <img
            src={menuIcon}
            alt="Menu"
            className="menu-icon"
            onClick={handleMenuClick} // Toggle sidebar visibility
          />
          <h1>🎯 Receiver Dashboard</h1>
        </div>
        <div className="navbar-right">
          {/* Logout Button */}
          <button onClick={() => navigate("/")} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
          <ul>
            <li onClick={() => handleSectionChange("home")}>Dashboard Home</li>
            <li onClick={() => handleSectionChange("request-form")}>Donation Request Form</li>
            <li onClick={() => handleSectionChange("foodrequest")}>Available Donations</li>
            <li onClick={() => handleSectionChange("requests")}>My Requests</li>
            <li onClick={() => handleSectionChange("schedule")}>Volunteer Schedule</li>
            <li onClick={() => handleSectionChange("profile")}>Edit Profile</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">{renderContent()}</main>
      </div>
    </div>
  );
};

export default ReceiverDashboard;
