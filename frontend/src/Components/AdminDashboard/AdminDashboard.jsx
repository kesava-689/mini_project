import "./AdminDashboard.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Donations from "./Donations/Donations";
import ManageUsers from "./ManageUsers/ManageUsers";
import Reports from "./Reports/Reports";
import RequestApproval from "./RequestApproval/RequestApproval";
import Dashboard from "./Dashboard/Dashboard";
import Chats from "./AdminChatHub/AdminChats";
import AdminVolunteerUpdates from "./AdminVolunteerUpdates/AdminVolunteerUpdates";
import AdminContacts from "./AdminContacts/AdminContacts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    setAdminName(admin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setAdminName("");
    navigate("/");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "donations":
        return <Donations />;
      case "reports":
        return <Reports />;
      case "manageUsers":
        return <ManageUsers />;
      case "food request":
        return <RequestApproval />;
      case "chats":
        return <Chats currentUser="admin" chatWith="volunteer" />;
      case "notifications":
        return <AdminVolunteerUpdates />;
      case "queries":
        return <AdminContacts/>;
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
      {/* Header */}
      <header className="admin-navbar">
        <h1>Food Wastage Management System</h1>
        <h4>Welcome</h4>
      </header>

      <div className="admin-body">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <ul>
            <li onClick={() => setActiveSection("dashboard")} className="link">Dashboard</li>
            <li onClick={() => setActiveSection("manageUsers")} className="link">Manage Users</li>
            <li onClick={() => setActiveSection("donations")} className="link">Donations</li>
            <li onClick={() => setActiveSection("food request")} className="link">Food Request</li>
            <li onClick={() => setActiveSection("notifications")} className="link">Volunteer Updates</li>
            <li onClick={() => setActiveSection("queries")} className="link">Queries</li>
            <li onClick={() => setActiveSection("chats")} className="link">Chats</li>
            <li onClick={handleLogout} className="link">Logout</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="admin-main">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
