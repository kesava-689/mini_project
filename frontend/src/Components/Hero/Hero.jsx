import './Hero.css';

import { FiMessageCircle, FiX } from 'react-icons/fi';
import React, { useState } from 'react';

import dark_arrow from '../../assets/dark-arrow.png';
import { useNavigate } from 'react-router-dom'; // Add this

const Hero = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleExploreClick = () => {
    navigate('/about'); // Route to your detailed content page
  };

  return (
    <div className='hero container'>
      <div className='hero-text'>
        <h1>Reduce Waste, Nourish the Future.</h1>
        <p>
          Join us in tackling food waste with smart, sustainable solutions.
          Every year, millions of tons of food go to waste while many
          communities face food insecurity. By adopting innovative strategies,
          we can minimize waste, conserve valuable resources, and create a more
          sustainable future.
        </p>
        <button className='btn' onClick={handleExploreClick}>
          Explore More
          <img src={dark_arrow} alt='Arrow icon' />
        </button>
      </div>

      {/* Floating Toggle Button */}
      <div className='chatbot-toggle-btn' onClick={toggleChatbot}>
        {showChatbot ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </div>

     {/* Chatbot Panel */}
     <div className={`chatbot-panel ${showChatbot ? 'open' : ''}`}>
        {/* --- New Chatbot Header --- */}
        <div className="chatbot-header">
          <h2>Need Help? Ask Us!</h2>
          <p>I'm your assistant for Food Waste Management.</p>
        </div>
        {/* --- Chatbot Iframe --- */}
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/eDLARBdPf7vISDLK4r9Q7"
          title="Chatbot"
          className="chatbot-iframe"
        ></iframe>
      </div>
    </div>
  );
};

export default Hero;
