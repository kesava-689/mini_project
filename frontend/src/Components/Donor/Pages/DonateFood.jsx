import React, { useState, useEffect } from "react";
import "./DonateFood.css";
import axios from "axios";

const DonateFood = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    address: "",
    expiryDate: "",
    foodType: "",
    donorName: localStorage.getItem("donorName") || "",
    coordinates: { lat: "", lon: "" },
  });

  const [debounceTimer, setDebounceTimer] = useState(null);
  const [message, setMessage] = useState("");

  const fetchCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setFormData((prev) => ({
          ...prev,
          coordinates: { lat, lon },
        }));
        setMessage(` Location found: ${display_name}`);
      } else {
        setMessage("❌ Address not found.");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      setMessage("❌ Error fetching location.");
    }
  };

  useEffect(() => {
    if (!formData.address) return;

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      fetchCoordinates(formData.address);
    }, 600);

    setDebounceTimer(timer);

    return () => clearTimeout(timer);
  }, [formData.address]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For quantity, ensure it is not less than 0
    if (name === "quantity") {
      if (value < 0) return; // prevent negative quantity
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { lat, lon } = formData.coordinates;
    if (!lat || !lon) {
      alert("⚠️ Please enter a valid address to fetch coordinates.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/donations/create", formData);
      alert("✅ Donation submitted for admin approval!");
      setFormData({
        ...formData,
        title: "",
        description: "",
        quantity: "",
        address: "",
        expiryDate: "",
        foodType: "",
        coordinates: { lat: "", lon: "" },
      });
      setMessage("");
    } catch (err) {
      alert("❌ Failed to donate food.");
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="donate-food-container">
      <div className="donate-overlay"></div>
      <form className="donate-form" onSubmit={handleSubmit}>
        <h2>Donate Food</h2>
        {message && <p style={{ color: "blue" }}>{message}</p>}

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Pickup Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>Expiry Date:</label>
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          min={today}   // set minimum to today's date
          required
        />

        <select name="foodType" value={formData.foodType} onChange={handleChange} required>
          <option value="">-- Select Food Type --</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Snacks">Snacks</option>
          <option value="Drinks">Drinks</option>
        </select>

        <button className="submit-btn" type="submit">Submit for Approval</button>
      </form>
    </div>
  );
};

export default DonateFood;
