import "./DonationDashboard.css";

import React, { useState } from "react";

import DashboardHome from "./Pages/DashboardHome";
import DonorChatBox from "./Pages/DonorChatBox";
import PostDonationForm from "./Pages/PostDonationForm";
import ViewRequests from "./Pages/ViewRequests";
import { useNavigate } from "react-router-dom";
import UpdatePassword from "./Pages/EditProfile";
import DonorChat from "./Pages/DonorChatBox";

const DonationsDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <DashboardHome restaurantId="resto123" />;
      case "post":
        return <PostDonationForm restaurantId="resto123" />;
      case "requests":
        return <ViewRequests restaurantId="resto123" />
      case "profile":
        return <UpdatePassword/>
      case "messages":
        return <DonorChat />;
      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };
  

  return (
    <div className="Donor-dashboard-wrapper">
      {/* Top Navbar */}
      <header className="dashboard-navbar">
        <h1>🍽️ Donor Dashboard</h1>
        <button onClick={() => navigate("/")} className="logout-btn">Logout</button>
      </header>

      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <ul>
            <li onClick={() => setActiveSection("home")}>Dashboard Home</li>
            <li onClick={() => setActiveSection("post")}>Post Donation</li>
            <li onClick={() => setActiveSection("requests")}>View Requests</li>
            <li onClick={() => setActiveSection("profile")}>Edit Profile</li>
            <li onClick={() => setActiveSection("messages")}>Messages</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="donor-dashboard-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DonationsDashboard;
