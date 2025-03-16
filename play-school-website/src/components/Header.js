import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import logo from '../assets/logonew.png';
import axios from 'axios';

const Header = () => {
  const [headerTopText, setHeaderTopText] = useState('');

  useEffect(() => {
    const fetchHeaderTop = async () => {
      const response = await axios.get('http://localhost:5000/api/header-top');
      setHeaderTopText(response.data?.headerTopText || 'Default Header Text');
    };
    fetchHeaderTop();
  }, []);

  return (
    <div className="header-container">
      <div className="header-top">
        <p>📣{headerTopText}📣</p>
      </div>
      <header>
        <nav className="header-nav">
          <div className="header-logo">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="header-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/">Gallery</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
          <div className="header-button">
            <a href="/login" className="apply-now">Login</a>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
