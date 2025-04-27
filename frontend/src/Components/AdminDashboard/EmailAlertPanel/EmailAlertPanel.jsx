import React, { useState } from "react";
import "./EmailAlertPanel.css";

const dummyData = [
  { id: 1, foodItem: "Bread Packets", location: "Chennai", hoursLeft: 3 },
  { id: 2, foodItem: "Rice Boxes", location: "Hyderabad", hoursLeft: 2 },
  { id: 3, foodItem: "Sandwiches", location: "Mumbai", hoursLeft: 1 },
];

const EmailAlertPanel = () => {
  const [isSent, setIsSent] = useState(false);

  const handleSendAlert = () => {
    setIsSent(true);

    // Optional: Call your alert API here
    setTimeout(() => {
      setIsSent(false); // Reset after animation
    }, 2000); // 2s fade time
  };
  return (
    <div className="email-alert-panel">
      <h2>📬 Email Alert Trigger Panel</h2>
      <p>Click the button to alert volunteers about food nearing expiry.</p>
      <table className="alert-table">
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Location</th>
            <th>Time Left</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item) => (
            <tr key={item.id}>
              <td>{item.foodItem}</td>
              <td>{item.location}</td>
              <td>{item.hoursLeft} hrs</td>
              <td>
              <button
  className={`alert-btn ${isSent ? 'sent' : ''}`}
  onClick={handleSendAlert}
>
  {isSent ? '✅ Alert Sent' : '📬 Send Alert'}
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailAlertPanel;
