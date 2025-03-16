import React from "react";
import "../styles/SideNavbar.css";

const SideNavbar = ({ onComponentChange }) => {
  return (
    <div className="SideNavbar">
      <h2>Admin Panel</h2>
      <ul>
      <li>
          <button
            onClick={() => onComponentChange("home")}
            className="side-nav-button"
          >
            Home
          </button>

        </li>
        <li>
          <button
            onClick={() => onComponentChange("gallery")}
            className="side-nav-button"
          >
            Gallery
          </button>
        </li>
        <li>
          <button
            onClick={() => onComponentChange("faqs")}
            className="side-nav-button"
          >
            FAQs
          </button>

        </li>
        {/* <li>
          <button
            onClick={() => onComponentChange("dashboard")}
            className="side-nav-button"
          >
            Dashboard
          </button>
        </li> */}
        <li>
          <button
            onClick={() => onComponentChange("about")}
            className="side-nav-button"
          >
            About
          </button>
        </li>
        <li>
          <button
            onClick={() => onComponentChange("news")}
            className="side-nav-button"
          >
            News
          </button>
        </li>
                
        <li>
          <button
            onClick={() => onComponentChange("contact")}
            className="side-nav-button"
          >
            Contact Us
          </button>

        </li>
      </ul>
    </div>
  );
};

export default SideNavbar;
