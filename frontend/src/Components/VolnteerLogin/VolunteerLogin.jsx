import "./VolunteerLogin.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import VolunteerImage from "../../assets/volunteer-login-side.png";

const VolunteerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("Click to fetch location...");
  const [coordinates, setCoordinates] = useState({ lat: "", lon: "" });
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const navigate = useNavigate();

  const fetchCoordinates = async (cityName) => {
    if (!cityName) return;

    setIsFetchingLocation(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setCoordinates({ lat, lon });
        setLocation(display_name);
        setMessage(`Location found: ${display_name}`);
      } else {
        setMessage("City not found.");
      }
    } catch (err) {
      console.error("Error fetching coordinates:", err);
      setMessage("Error fetching location.");
    } finally {
      setIsFetchingLocation(false);
    }
  };

  useEffect(() => {
    if (!city) return;

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      fetchCoordinates(city);
    }, 600);

    setDebounceTimer(timer);

    return () => clearTimeout(timer);
  }, [city]);

  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/send-otp", {
        email,
        password,
        location,
        coordinates,
        role: "volunteer",
      });

      if (response.data.isApproved === false) {
        setMessage("Your account is not yet approved by admin.");
        return;
      }

      setMessage(response.data.message);
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp,
      });

      setMessage(response.data.message);
      if (response.data.success) {
        localStorage.setItem("volunteerName", response.data.name);
        localStorage.setItem("volunteerId", response.data.user_id);
        navigate("/volunteerpage");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div className="volunteer-login-container">
      <motion.div
        className="login-popup"
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left Image Section */}
        <div className="login-left">
          <img src={VolunteerImage} alt="volunteer service" />
        </div>

        {/* Right Login Form Section */}
        {step === 1 ? (
          <div className="login-right">
            <h2>Volunteer Login</h2>
            {message && <p style={{ color: "red" }}>{message}</p>}
            {isFetchingLocation && <p style={{ color: "blue" }}>Fetching location...</p>}
            <form>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter your city"
                  required
                />
              </div>

              <button type="button" onClick={sendOtp} className="login-btn">
                Get OTP
              </button>
            </form>
            <p>
              Not registered? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        ) : (
          <div className="login-right">
            <h2>OTP Verification</h2>
            {message && <p style={{ color: "red" }}>{message}</p>}
            <form>
              <div className="input-group">
                <label>Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button type="button" onClick={verifyOtp} className="login-btn">
                Verify OTP & Login
              </button>
            </form>
            <p>
              Not registered? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VolunteerLogin;
