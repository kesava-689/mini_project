import "./FoodWasteInitiative.css";

import React, { useState } from "react";

import Modal from "../Modal/Modal";
import donateImage from "../../assets/donate-food.png";
import restaurantImage from "../../assets/partner-restaurant.png";
import volunteerImage from "../../assets/volunteer.png";

const cardData = [
  {
    image: donateImage,
    title: "Donate Excess Food",
    shortDescription: "Help reduce food waste...",
    fullDescription: "Help reduce food waste by donating extra food to shelters and communities in need. Your donations can make a big impact in reducing hunger and waste.",
    buttonText: "Donate Now",
  },
  {
    image: volunteerImage,
    title: "Join as a Volunteer",
    shortDescription: "Be a part of the movement...",
    fullDescription: "Be a part of the movement to collect, sort, and distribute surplus food effectively. Volunteering helps in creating a sustainable future.",
    buttonText: "Join Us",
  },
  {
    image: restaurantImage,
    title: "Partner with Restaurants",
    shortDescription: "Collaborate with local restaurants...",
    fullDescription: "Collaborate with local restaurants to redirect surplus food to charities. This partnership ensures that excess food is used to help those in need.",
    buttonText: "Partner Now",
  },
];

const FoodWasteInitiative = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", shortDescription: "", fullDescription: "" });

  const handleOpenModal = (title, shortDescription, fullDescription) => {
    setModalContent({ title, shortDescription, fullDescription });
    setShowModal(true);
  };

  return (
    <section className="initiative-container">
      <h2 className="initiative-title">Join the Fight Against Food Waste</h2>
      <p className="initiative-subtitle">
        Together, we can create a sustainable future by reducing food waste and helping those in need.
      </p>

      <div className="card-container">
        {cardData.map((card, index) => (
          <div key={index} className="card-sheet">
            <img src={card.image} alt={card.title} className="card_image" />
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>         
              <p className="card-description">{card.shortDescription}</p>
              <button 
                className="card-button" 
                onClick={() => handleOpenModal(card.title, card.shortDescription, card.fullDescription)}
              >
                {card.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal 
          isOpen={showModal} 
          title={modalContent.title} 
          shortDescription={modalContent.shortDescription} 
          fullDescription={modalContent.fullDescription} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </section>
  );
};

export default FoodWasteInitiative;