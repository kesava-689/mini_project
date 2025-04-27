import "./ChatBox.css";

import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

const ChatBox = ({ currentUser = "volunteer", chatWith = "admin" }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // ✅ 1. Fetch messages from backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/messages/${currentUser}/${chatWith}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, [currentUser, chatWith]);

  // ✅ 2. Send message to backend
  const sendMessage = async () => {
    if (newMsg.trim() === "") return;

    const newMessage = {
      sender: currentUser,
      receiver: chatWith,
      content: newMsg,
    };

    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      const savedMessage = await res.json();
      setMessages((prev) => [...prev, savedMessage]); // ✅ Add to UI
      setNewMsg("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">💬 Volunteer Chat with {chatWith}</div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <motion.div
            key={msg._id || index}
            className={`message ${msg.sender === currentUser ? "sent" : "received"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {msg.content}
          </motion.div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="chat-sent-btn" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;





