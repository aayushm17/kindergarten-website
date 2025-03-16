import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Contact.css";
import image from "../assets/contact.png";

const Contact = () => {
  const [contactDetails, setContactDetails] = useState({
    location: "",
    phone: "",
    email: "",
    socialLinks: {
      youtube: "",
      instagram: "",
      facebook: "",
      twitter: ""
    }
  });

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contact');
        setContactDetails(response.data);
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };

    fetchContactDetails();
  }, []);

  return (
    <div className="contact-us-container">
      <div className="contact-img">
        <img src={image} alt="Contact Us" className="about-image" />
      </div>
      <div className="contact-header">
        <h1>Contact Us</h1>
      </div>
      <div className="contact-content">
        <div className="contact-info">
          <p className="contact-item">
            <span className="icon">📍</span>
            {contactDetails.location}
          </p>
          <p className="contact-item">
            <span className="icon">📞</span>
            {contactDetails.phone}
          </p>
          <p className="contact-item">
            <span className="icon">📧</span>
            {contactDetails.email}
          </p>
          <div className="social-icons">
            {contactDetails.socialLinks.youtube && (
              <a
                href={contactDetails.socialLinks.youtube}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube"></i>
              </a>
            )}
            {contactDetails.socialLinks.instagram && (
              <a
                href={contactDetails.socialLinks.instagram}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            )}
            {contactDetails.socialLinks.facebook && (
              <a
                href={contactDetails.socialLinks.facebook}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </a>
            )}
            {contactDetails.socialLinks.twitter && (
              <a
                href={contactDetails.socialLinks.twitter}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
            )}
          </div>
        </div>
        <div className="contact-map">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2755.309032751091!2d77.20869227438064!3d28.58659517568985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce28e3ee2f157%3A0x3d41f8a90e1807f1!2sRajiv%20Gandhi%20Bhawan%20Rd%2C%20Safdarjung%20Airport%20Area%2C%20Satya%20Sadan%2C%20New%20Delhi%2C%20Delhi%20110021!5e1!3m2!1sen!2sin!4v1736848858029!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
