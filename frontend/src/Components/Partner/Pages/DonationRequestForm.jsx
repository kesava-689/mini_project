import './DonationRequestForm.css';
import axios from 'axios';


import React, { useState } from 'react';

const DonationRequestForm = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    donorName: '',
    donorEmail: '',
    foodType: '',
    amountNeeded: '',
    reason: '',
    contactNumber: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/donation-request', formData);
  
      console.log('Form submitted:', response.data);
      setFormSubmitted(true);
  
      // Reset the form
      setFormData({
        organizationName: '',
        donorName: '',
        donorEmail: '',
        foodType: '',
        amountNeeded: '',
        reason: '',
        contactNumber: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit donation request.');
    }
  };
  

  return (
    <div className="donation-request-form">
      <h2>Donation Request Form</h2>
      {formSubmitted && <div className="success-message">Thank you for your donation request!</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="organizationName">Organization Name</label>
          <input
            type="text"
            id="organizationName"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="donorName">Your Name</label>
          <input
            type="text"
            id="donorName"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="donorEmail">Email Address</label>
          <input
            type="email"
            id="donorEmail"
            name="donorEmail"
            value={formData.donorEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="foodType">Type of Food Needed</label>
          <input
            type="text"
            id="foodType"
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amountNeeded">Amount of Food Needed</label>
          <input
            type="number"
            id="amountNeeded"
            name="amountNeeded"
            value={formData.amountNeeded}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason for Donation Request</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        <button className="request-btn" type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default DonationRequestForm;