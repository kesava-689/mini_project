import React, { useState } from "react";
import "./AdminSettings.css";

const AdminSettings = () => {
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    // Simple validation: ensure new password and confirm match
    if (password !== confirmPassword) {
      setMessage("Error: Passwords do not match!");
      return;
    }

    // Simulate saving the settings (this is where you'll call your backend API)
    setMessage("Settings saved successfully!");
    // Optionally reset the password fields:
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="admin-settings-container">
      <h2>Admin Profile Settings</h2>
      <form onSubmit={handleSave} className="admin-settings-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input 
            type="password" 
            id="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter new password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input 
            type="password" 
            id="confirmPassword"
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm new password"
          />
        </div>

        <button type="submit">Save Changes</button>

        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

export default AdminSettings;




