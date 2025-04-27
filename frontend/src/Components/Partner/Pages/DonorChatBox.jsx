// VolunteerChat.jsx
import React, { useEffect, useState } from "react";
import ChatBox from "./Chatbox"; // You already have this
import "./DonorChatBox.css"; // Optional: extra styling for this page

const DonorChat = () => {
  const [volunteerName, setVolunteerName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("partnerName"); // set this on login
    if (storedName) {
      setVolunteerName(storedName);
    }
  }, []);

  return (
    <div className="volunteer-chat-page">
      {volunteerName ? (
        <>
          <h2 className="chat-welcome">Welcome, {volunteerName} 👋</h2>
          <ChatBox currentUser={volunteerName} chatWith="admin" />
        </>
      ) : (
        <p className="chat-error">Partner name not found. Please login again.</p>
      )}
    </div>
  );
};

export default DonorChat;
