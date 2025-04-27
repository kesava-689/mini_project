// src/components/AdminLogin/AdminLogin.jsx
import React, { useState } from 'react';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ closeModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy credentials
    if (username === 'Sravani' && password === 'Sravani123') {
      closeModal();
      navigate('/admin-dashboard');
    } else {
      alert('Invalid credentials!');
    }
    localStorage.setItem("admin","Sravani");
  };
  const handleCancel = (e) => {
    e.preventDefault(); // Prevent form submission
    closeModal(); // Just close the modal
  };

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-modal">
        <button className="close-btn" onClick={closeModal}>✕</button>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
           <button type="submit" className="login-btn">Login</button>
          <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
