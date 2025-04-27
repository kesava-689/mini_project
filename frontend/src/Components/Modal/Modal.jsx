import "./Modal.css";

import React, { useState } from "react";

const Modal = ({ isOpen, onClose, title, shortDescription, fullDescription }) => {
  const [showFull, setShowFull] = useState(false); // Controls visibility of full description

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        
        {/* Show short description initially */}
        <p className="modal-description">{showFull ? fullDescription : shortDescription}</p>

        {/* Toggle button to show/hide full description */}
        <button className="modal-toggle-button" onClick={() => setShowFull(!showFull)}>
          {showFull ? "Show Less" : "Show More"}
        </button>

        <button className="modal-close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
