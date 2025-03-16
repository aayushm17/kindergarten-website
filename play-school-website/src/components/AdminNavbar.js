import React from 'react';
import '../styles/Header.css';
import logo from '../assets/logonew.png'; // Import your logo image

const AdminNavbar = () => {
  return (
    <div className="header-container">
      {/* Top Border with Text */}
      <div className="header-top">
        <p>📣Admin Dashboard📣</p>
      </div>

      {/* Main Header */}
      <header>
        <nav className="header-nav">
          {/* Logo on the Left */}
          <div className="header-logo">
            <img src={logo} alt="Logo" />
          </div>

          {/* Navigation Links in the Center */}
          <ul className="header-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/">Gallery</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>

          {/* "Apply Now" Button on the Right */}
          <div className="header-button">
            <a href="#apply" className="apply-now">Apply Now</a>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default AdminNavbar;
