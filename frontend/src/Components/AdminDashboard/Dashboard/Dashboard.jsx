import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for redirecting
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalVolunteers: 0,
    totalDonors: 0,
    totalPartners: 0,
    volunteerNames: [],
    donorNames: [],
    partnerNames: [],
  });

  useEffect(() => {
    const adminName = localStorage.getItem("admin");
    if (adminName === "Sravani") {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setIsAuthenticated(false);
      // redirect or show access denied
      navigate("/admin-dashboard"); // change this if you want another fallback
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/dashboard");
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  if (!isAuthenticated) {
    return <h3>Access Denied. Only admin can access this page.</h3>;
  }

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard - Active Users</h2>
      <div className="dashboard-stats">
        {/* Volunteers */}
        <div className="stats-card">
          <h3>Total Volunteers</h3>
          <p>{dashboardData.totalVolunteers}</p>
          <h4>Names:</h4>
          <ul>
            {dashboardData.volunteerNames.length > 0 ? (
              dashboardData.volunteerNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))
            ) : (
              <li>No volunteers available</li>
            )}
          </ul>
        </div>

        {/* Donors */}
        <div className="stats-card">
          <h3>Total Donors</h3>
          <p>{dashboardData.totalDonors}</p>
          <h4>Names:</h4>
          <ul>
            {dashboardData.donorNames.length > 0 ? (
              dashboardData.donorNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))
            ) : (
              <li>No donors available</li>
            )}
          </ul>
        </div>

        {/* Partners */}
        <div className="stats-card">
          <h3>Total Partners</h3>
          <p>{dashboardData.totalPartners}</p>
          <h4>Names:</h4>
          <ul>
            {dashboardData.partnerNames.length > 0 ? (
              dashboardData.partnerNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))
            ) : (
              <li>No partners available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
