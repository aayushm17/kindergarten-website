// FooterComponent.jsx
import React from 'react';
import '../styles/Footer.css';
import logo from '../assets/logonew.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logo} alt="Airports Authority of India Logo" />
        <p>It is our goal to provide age appropriate opportunity for every child enrolled in AAI-Kid Kids Club enrichment classes.</p>
      </div>
      <div className="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="#curriculums">Curriculums</a></li>
          <li><a href="#new-programs">New Programs</a></li>
          <li><a href="#courses">Courses</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div className="footer-contact">
        <h3>Contact Us</h3>
        <p><span role="img" aria-label="Location">📍</span> Lorem Ipsum</p>
        <p><span role="img" aria-label="Phone">📞</span> 012-345-6789</p>
        <p><span role="img" aria-label="Email">📧</span> aaisupport@email.com</p>
      </div>
      <div className="footer-bottom">
        <p>© 2024 – Airports Authority Of India</p>
        <p>All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
