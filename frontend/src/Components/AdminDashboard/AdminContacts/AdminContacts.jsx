import React, { useEffect, useState } from 'react';
import './AdminContacts.css';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/contacts")
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error("Error fetching contacts:", err));
  }, []);

  return (
    <div className="contact-list">
  {contacts.map((contact, index) => (
    <div className="contact-card" key={index}>
      <h3>{contact.name}</h3>
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>Message:</strong> {contact.message}</p>
      <span><strong>Received:</strong> {new Date(contact.createdAt).toLocaleString()}</span>
    </div>
  ))}
</div>

  );
};

export default AdminContacts;
