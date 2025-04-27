import "./Signup.css";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import partnerImage from "../../assets/donor-login-side.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    if (!passwordRegex.test(password)) {
      setMessage("Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        role,
      });

      setMessage("Registration successful. Please wait for admin approval.");
      setIsRegistered(true);

      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="signup-container">
      <motion.div
        className="login-popup"
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left Image Section */}
        <div className="login-left">
          <img src={partnerImage} alt="donor service" />
        </div>

        {/* Right Login Form Section */}
        <div className="login-right">
          <h2>Register</h2>
          {message && <p className="signup-message">{message}</p>}

          {!isRegistered && (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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
                <label>Role</label>
                <select
                  name="role"
                  className="input-field"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="" disabled>Select role</option>
                  <option value="donor">Donor</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <button type="submit" className="login-btn">Register</button>
            </form>
          )}

          {/* Here is the corrected Link */}
          <p style={{ marginTop: "10px" }}>
            Already registered?{" "}
            <Link to="/signin-options" style={{ color: "#007bff", textDecoration: "underline" }}>
              Login
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
