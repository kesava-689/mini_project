import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notifications.css"; // Reusing the same styles

const VolunteerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const volunteerName = localStorage.getItem("volunteerName");

const fetchNotifications = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/notifications/volunteer/${volunteerName}`);
    setNotifications(res.data);
    setUnreadCount(res.data.filter((notif) => !notif.read).length);
  } catch (err) {
    console.error("Error fetching notifications:", err);
  }
};

  const handleNotificationClick = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/read/${id}`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif._id === id ? { ...notif, read: true } : notif
        )
      );
      setUnreadCount(unreadCount - 1); // Decrease unread count
    } catch (err) {
      console.error("Error updating notification status:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="notifications-container">
      <h2>My Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notif) => (
            <li
              key={notif._id}
              className={notif.read ? "notification-item read" : "notification-item unread"}
              onClick={() => handleNotificationClick(notif._id)}
            >
              <p>{notif.message}</p>
              <small>{new Date(notif.date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
      {unreadCount > 0 && (
        <div className="unread-count">
          You have {unreadCount} unread notifications
        </div>
      )}
    </div>
  );
};

export default VolunteerNotifications;
