import "./SignInOptions.css";
import React from "react";
import donorImage from "../../assets/food_donate.png";
import partnerImage from "../../assets/food_partner.png";
import { useNavigate } from "react-router-dom";
import volunteerImage from "../../assets/food_volunteer.png";

const SignInOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="signin-options">
      <h2>Choose Your Role</h2>
      <p className="signin-description">
        Join our mission to reduce food waste and support those in need. Select your role below to get started.
      </p>
      <div className="signin-content">
        <div className="signin-card" onClick={() => navigate("/volunteer")}>
          <div className="card-image card-left">
            <img src={volunteerImage} alt="Volunteer" />
          </div>
          <h3><button className="btn">Volunteer</button></h3>
          <p>Help us distribute surplus food and make a direct impact in your community.</p>
        </div>
        <div className="signin-card" onClick={() => navigate("/partner")}>
          <div className="card-image">
            <img src={partnerImage} alt="Partner" />
          </div>
          <h3><button className="btn">Partner</button></h3>
          <p>Collaborate with us as a restaurant, NGO, or business to reduce food waste.</p>
        </div>
        <div className="signin-card" onClick={() => navigate("/donor")}>
          <div className="card-image">
            <img src={donorImage} alt="Donor" />
          </div>
          <h3><button className="btn">Donor</button></h3>
          <p>Donate surplus food and contribute to a sustainable future.</p>
        </div>
      </div>
    </div>
  );
};

export default SignInOptions;
