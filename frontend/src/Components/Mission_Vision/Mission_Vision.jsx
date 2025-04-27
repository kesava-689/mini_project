import './Mission_Vision.css'

import React from "react";
import howItWorksImage from "../../assets/how-it-work.png"; // Ensure this file exists
import joinUsImage from "../../assets/join-us.png"; // Ensure this file exists
import visionImage from "../../assets/vision.png"; // Ensure this file exists

const Mission_Vision = () => {
  return (
    <div className="about-container">
      <h2>About Food Wastage Management</h2>
      <p className="about-description">
        Our mission is to reduce food waste and promote sustainable practices. By joining our platform, you can contribute to a healthier planet and help those in need.
      </p>
      <div className="about-content">
        <div className="about-card">
          <div className="card-image">
            <img src={visionImage} alt="Vision" />
          </div>
          <h3>Our Vision</h3>
          <p>
            We envision a world where no food goes to waste, and every individual has access to nutritious meals.
          </p>
        </div>
        <div className="about-card">
          <div className="cardimage">
            <img src={howItWorksImage} alt="How It Works" />
          </div>
          <h3>How It Works</h3>
          <p>
            Our platform connects individuals, restaurants, and NGOs to share surplus food and reduce waste effectively.
          </p>
        </div>
        <div className="about-card">
          <div className="card-image">
            <img src={joinUsImage} alt="Join Us" />
          </div>
          <h3>Join Us</h3>
          <p>
            Sign up today to become part of the solution and make a difference in your community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission_Vision;