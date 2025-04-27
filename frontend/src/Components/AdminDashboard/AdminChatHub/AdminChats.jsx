import './AdminChats.css';

import React, { useEffect, useState } from 'react';

import ChatBox from './ChatBox';

const chatTypes = [
  { label: 'Volunteer', value: 'volunteer' },
  { label: 'Donor', value: 'donor' },
  { label: 'Partner', value: 'partnership' }
];

const AdminChats = () => {
  const [selectedChatType, setSelectedChatType] = useState('volunteer');
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users when role changes
  useEffect(() => {
    setSelectedUser(null); // Reset selected user
    fetch(`http://localhost:5000/api/users/role/${selectedChatType}`)
      .then((res) => res.json())
      .then((data) => setUsersList(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, [selectedChatType]);

  return (
    <div className="admin-chat-container">
      {/* Sidebar: Chat types and user list */}
      <div className="chat-sidebar">
        {chatTypes.map((chat) => (
          <button
            key={chat.value}
            className={selectedChatType === chat.value ? 'active' : ''}
            onClick={() => setSelectedChatType(chat.value)}
          >
            {chat.label}
          </button>
        ))}

        <div className="user-list">
          {usersList.map((user) => (
            <button
              key={user._id}
              className={selectedUser?.name === user.name ? 'selected-user' : ''}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="chat-main">
        {selectedUser ? (
          <ChatBox currentUser="admin" chatWith={selectedUser.name} />
        ) : (
          <p className="placeholder">Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default AdminChats;