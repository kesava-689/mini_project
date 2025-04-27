import "./DonorLogin.css";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import partnerImage from "../../assets/donor-login-side.png"; // ✅ make sure path is correct

const DonorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/send-otp", {
        email,
        password,
        role: "donor",
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
        localStorage.setItem("donorName", response.data.name);
        navigate("/donorpage");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div className="donor-login-container">
      <motion.div
        className="login-popup"
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="login-left">
          <img src={partnerImage} alt="donor service" />
        </div>

        {step === 1 ? (
          <div className="login-right">
            <h2>Donor Login</h2>
            {message && <p>{message}</p>}
            <form>
              <div className="input-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="button" onClick={sendOtp} className="login-btn">Get OTP</button>
            </form>
            <p>Not registered? <Link to="/signup">Sign Up</Link></p>
          </div>
        ) : (
          <div className="login-right">
            <h2>Donor Login</h2>
            {message && <p>{message}</p>}
            <form>
              <div className="input-group">
                <label>Enter OTP</label>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              </div>
              <button type="button" onClick={verifyOtp} className="login-btn">Verify OTP & Login</button>
            </form>
            <p>Not registered? <Link to="/signup">Sign Up</Link></p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DonorLogin;
