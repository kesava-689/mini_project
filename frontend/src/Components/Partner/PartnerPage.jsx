import "./PartnerPage.css";

import React from "react";
import { useNavigate } from "react-router-dom";

const PartnerPage = () => {
  const navigate = useNavigate();

  const goToDonorDashboard = () => {
    navigate("/donation-dashboard");
  };

  const goToReceiverDashboard = () => {
    navigate("/receiver-dashboard");
  };

  return (
    <div className="partner-page">
      <h2 className="page-title">🤝 Partner Network</h2>

      <div className="partner-boxes">
        {/* Donation Partners */}
        <div className="partner-card">
          <h3 className="partner-header clickable">
            🍽️ Donation Partners
          </h3>
          <ul className="partner-list">
            <li>Sunrise Hotel</li>
            <li>Green Leaf Restaurant</li>
            <li>Royal Dine Inn</li>
            <li>Blue Ocean Resort</li>
            <li>Urban Bites Café</li>
            <button className="partner-btn" onClick={goToDonorDashboard}>click here</button>
          </ul>
        </div>

        {/* Receiver Partners */}
        <div className="partner-card">
          <h3 className="partner-header clickable">
            🎯 Receiver Organizations
          </h3>
          <ul className="partner-list">
            <li>Helping Hands NGO</li>
            <li>Hope For All Foundation</li>
            <li>CareBridge Org</li>
            <li>Uplift Society</li>
            <li>Feed the Future</li>
            <button className="partner-btn" onClick={goToReceiverDashboard}>click here</button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PartnerPage;
