import "./DonorNavbar.css";

import React from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const DonorNavbar = () => {
  const navigate = useNavigate();
  const donorName = localStorage.getItem("donorName");

  
  const handleLogin = () => {
    navigate("/signin-options");
  };

  return (
    <nav className="donor-navbar">
      <div className="donor-navbar-left">
        <span className="system-name">Food Wastage Management</span>
      </div>
      <div className="donor-navbar-right">
        {donorName ? (
          <>
            <span className="donor-name">Welcome, {donorName}</span>
          </>
        ) : (
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default DonorNavbar;
