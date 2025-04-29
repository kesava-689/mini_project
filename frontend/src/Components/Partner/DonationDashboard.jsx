import "./DonationDashboard.css";

import React, { useState } from "react";

import DashboardHome from "./Pages/DashboardHome";
import DonorChat from "./Pages/DonorChatBox";
import PostDonationForm from "./Pages/PostDonationForm";
import UpdatePassword from "./Pages/EditProfile";
import ViewRequests from "./Pages/ViewRequests";
// Importing the menu icon for mobile view
import menuIcon from "../../assets/menu.png";
import { useNavigate } from "react-router-dom";

const DonationsDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar visibility

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <DashboardHome restaurantId="resto123" />;
      case "post":
        return <PostDonationForm restaurantId="resto123" />;
      case "requests":
        return <ViewRequests restaurantId="resto123" />;
      case "profile":
        return <UpdatePassword />;
      case "messages":
        return <DonorChat />;
      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen); // Toggle the sidebar on mobile
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar on section change
  };

  return (
    <div className="Donor-dashboard-wrapper">
      {/* Top Navbar */}
      <header className="donor-dashboard-navbar">
        <div className="donor-navbar-left">
          {/* Menu Icon for Mobile */}
          <img
            src={menuIcon}
            alt="Menu"
            className="menu-icon"
            onClick={handleMenuClick} 
          />
          <h1>🍽️ Donor Dashboard</h1>
        </div>
        <div className="donor-navbar-right">
          {/* Logout Button */}
          <button onClick={() => navigate("/")} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="donor-dashboard-body">
        {/* Sidebar */}
        <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
          <ul>
            <li onClick={() => handleSectionChange("home")}>Dashboard Home</li>
            <li onClick={() => handleSectionChange("post")}>Post Donation</li>
            <li onClick={() => handleSectionChange("requests")}>View Requests</li>
            <li onClick={() => handleSectionChange("profile")}>Edit Profile</li>
            <li onClick={() => handleSectionChange("messages")}>Messages</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="donor-dashboard-main">{renderContent()}</main>
      </div>
    </div>
  );
};

export default DonationsDashboard;
