import './Footer.css';

import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

import { NavLink } from 'react-router-dom';
import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About & Contact Section */}
        <div className="footer-column">
          <h2 className="footer-title">Food Waste Management</h2>
          <p className="footer-description">
            We are committed to reducing food waste by redistributing surplus food, promoting composting, and building a greener, hunger-free world.
          </p>
          <div className="footer-contact">
            <p>RGUKT RKVALLEY</p>
            <p>chennakesavulu689@gmail.com</p>
            <p>📞 +91 6305732145</p>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-column">
          <h3 className="footer-subtitle">Quick Links</h3>
          <ul className="quick-links">
            <li><ScrollLink to="hero" smooth={true} offset={0} duration={500}>Home</ScrollLink></li>
            <li><ScrollLink to="program" smooth={true} offset={-260} duration={500}>Program</ScrollLink></li>
            <li><ScrollLink to="about" smooth={true} offset={-150} duration={500}>About Us</ScrollLink></li>
            <li><ScrollLink to="campus" smooth={true} offset={-260} duration={500}>Gallery</ScrollLink></li>
            <li><ScrollLink to="testimonials" smooth={true} offset={-260} duration={500}>Testimonials</ScrollLink></li>
            <li><ScrollLink to="contact" smooth={true} offset={-260} duration={500}>Contact Us</ScrollLink></li>
            <li><NavLink to="/signin-options">Sign In</NavLink></li>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
          </ul>
        </div>

        {/* Website Owners Section */}
        <div className="owner-column">
          <h3 className="owner-subtitle">Website Owners</h3>
          <div className="owner-contact">
            <p>Kesava 📞 6305732145</p>
            <p>Chinmayee 📞 9381573725</p>
            <p>Sravani 📞 9908025175</p>
          </div>
        </div>

        {/* Newsletter and Social Media */}
        <div className="footer-column newsletter-social">
          <div className="footer-newsletter">
            <h3 className="footer-subtitle">Subscribe</h3>
            <div className="newsletter-input">
              <input type="email" placeholder="Your email" />
              <button className="arrow-btn">→</button>
            </div>
          </div>

          <div className="footer-social">
            <h3 className="footer-subtitle">Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Food Waste Management | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;