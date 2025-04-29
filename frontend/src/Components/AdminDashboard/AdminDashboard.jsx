import "./AdminDashboard.css";

import React, { useEffect, useState } from "react";

import AdminContacts from "./AdminContacts/AdminContacts";
import AdminVolunteerUpdates from "./AdminVolunteerUpdates/AdminVolunteerUpdates";
import Chats from "./AdminChatHub/AdminChats";
import Dashboard from "./Dashboard/Dashboard";
import Donations from "./Donations/Donations";
import ManageUsers from "./ManageUsers/ManageUsers";
import Reports from "./Reports/Reports";
import RequestApproval from "./RequestApproval/RequestApproval";
import menuclick from "../../assets/menu-click.png"; // menu icon
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    setAdminName(admin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar on mobile after clicking
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "manageUsers":
        return <ManageUsers />;
      case "donations":
        return <Donations />;
      case "foodRequest":
        return <RequestApproval />;
      case "notifications":
        return <AdminVolunteerUpdates />;
      case "queries":
        return <AdminContacts />;
      case "chats":
        return <Chats currentUser="admin" chatWith="volunteer" />;
      case "reports":
        return <Reports />;
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  if (!adminName) {
    return (
      <div className="admin-wrapper">
        <header className="admin-navbar">
          <h1>Admin Dashboard</h1>
          <button onClick={() => navigate("/")} className="logout-btn">
            Login
          </button>
        </header>
        <main className="admin-main">
          <h2 style={{ marginTop: "40px", textAlign: "center", color: "#ffffff" }}>
            Please login to access the admin dashboard.
          </h2>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      {/* Top Navbar */}
      <header className="admin-navbar">
        <div className="navbar-left">
          {/* Menu Icon */}
          <img
            src={menuclick}
            alt="Menu"
            className="menu-icon"
            onClick={handleMenuClick}
          />
          <h1>Admin Dashboard</h1>
        </div>
        <div className="navbar-right">
          <p className="welcome">Welcome</p>
        </div>
      </header>

      <div className="admin-body">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
          <ul>
            <li onClick={() => handleSectionChange("dashboard")}>Dashboard</li>
            <li onClick={() => handleSectionChange("manageUsers")}>Manage Users</li>
            <li onClick={() => handleSectionChange("donations")}>Donations</li>
            <li onClick={() => handleSectionChange("foodRequest")}>Food Request</li>
            <li onClick={() => handleSectionChange("notifications")}>Volunteer Updates</li>
            <li onClick={() => handleSectionChange("queries")}>Queries</li>
            <li onClick={() => handleSectionChange("chats")}>Chats</li>
            <li onClick={() => handleSectionChange("reports")}>Reports</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="admin-main">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
