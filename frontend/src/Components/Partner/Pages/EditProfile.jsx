import React, { useState } from "react";
import axios from "axios";
import "./EditProfile.css";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const donorName = localStorage.getItem("partnerName");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!donorName) {
      setError("Partner name not found. Please login again.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.put("http://localhost:5000/api/user/update-password", {
        donorName,
        oldPassword,
        newPassword,
      });

      setSuccessMsg(res.data.message || "Password updated successfully.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Failed to update password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="update-password-container">
      <h2>Update Password</h2>
      <form onSubmit={handleUpdatePassword}>
        <div className="form-group">
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {successMsg && <p className="success-message">{successMsg}</p>}

        <button className="edit-btn" type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
