import "./Services.css";

import { FaBolt, FaChartLine, FaHandsHelping, FaLeaf, FaRecycle, FaSeedling, FaUsers } from "react-icons/fa";

import React from "react";

const services = [
  { id: "waste-collection", title: "Waste Collection & Recycling", icon: <FaRecycle />, link: "/waste-collection" },
  { id: "food-redistribution", title: "Food Redistribution", icon: <FaHandsHelping />, link: "/food-redistribution" },
  { id: "composting", title: "Composting Solutions", icon: <FaSeedling />, link: "/composting" },
  { id: "smart-bins", title: "Smart Bins & AI Monitoring", icon: <FaLeaf />, link: "/smart-bins" },
  { id: "waste-to-energy", title: "Waste-to-Energy Conversion", icon: <FaBolt />, link: "/waste-to-energy" },
  { id: "education", title: "Awareness & Education", icon: <FaUsers />, link: "/education" },
  { id: "impact", title: "Success Stories & Impact", icon: <FaChartLine />, link: "/impact" }
];

const Service = ({ closePopup }) => {
  // Close popup when clicking the background
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("service-popup")) {
      closePopup();
    }
  };

  return (
    <div className="service-popup" onClick={handleOverlayClick}>
      <div className="service-content" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside from closing */}
        <span className="close-btn" onClick={closePopup}>&times;</span>
        <h2>Our Services</h2>
        <p>We offer sustainable solutions to reduce food waste and promote eco-friendly practices.</p>
        <div className="service-list">
          {services.map((service) => (
            <a key={service.id} href={service.link} className="service-item">
              {service.icon}
              <span>{service.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
