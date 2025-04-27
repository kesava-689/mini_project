import './AboutWebsite.css';

import React, { useEffect } from 'react';

import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AboutFoodWaste = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClose = () => {
    navigate('/'); // or use `navigate(-1)` to go back to previous page
  };

  return (
    <div className='about-website-completely'>
      <div className='about-food-waste'>
      {/* Close Button */}
      <div className="close-button" onClick={handleClose}>
        <FiX size={20} />
      </div>

      <h1>Understanding Food Waste Management</h1>
      <p>
        Food waste is a growing global concern, with environmental, social, and
        economic implications. Our mission is to bridge the gap between surplus
        and scarcity by creating a platform where food donations, volunteerism,
        and partnerships thrive.
      </p>

      <section>
        <h2>Why Food Waste Matters</h2>
        <p>
          Around one-third of all food produced globally is wasted. This results in
          a massive waste of water, energy, and labor. Meanwhile, millions go
          hungry. Our goal is to eliminate this imbalance through community-driven
          initiatives.
        </p>
      </section>

      <section>
        <h2>What We Do</h2>
        <ul>
          <li>Connect donors with local NGOs and food banks</li>
          <li>Engage volunteers for pickup and distribution</li>
          <li>Educate the public on sustainable food practices</li>
          <li>Partner with restaurants, farms, and organizations</li>
        </ul>
      </section>

      <section>
        <h2>Get Involved</h2>
        <p>
          Whether you're an individual looking to make a difference or an
          organization with surplus food, our platform empowers you to act. Join us
          in building a future with zero food waste.
        </p>
      </section>
    </div>
    </div>
  );
};

export default AboutFoodWaste;