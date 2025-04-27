import "./ChatBox.css";

import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

const ChatBox = ({ currentUser = "admin", chatWith = "volunteer" }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/messages/${currentUser}/${chatWith}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [currentUser, chatWith]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    const message = {
      sender: currentUser,
      receiver: chatWith,
      content: newMsg,
    };

    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      const saved = await res.json();
      setMessages((prev) => [...prev, saved]);
      setNewMsg("");
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        💬 Chat with {chatWith}
      </div>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <motion.div
            key={msg._id || idx}
            className={`message ${msg.sender === currentUser ? "sent" : "received"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div>{msg.content}</div>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </motion.div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;