import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ContactAdmin.css";

const ContactAdmin = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in contactDetails.socialLinks) {
      setContactDetails({
        ...contactDetails,
        socialLinks: {
          ...contactDetails.socialLinks,
          [name]: value
        }
      });
    } else {
      setContactDetails({
        ...contactDetails,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/contact', contactDetails);
      alert("Contact details updated successfully!");
    } catch (error) {
      console.error("Error updating contact details:", error);
    }
  };

  return (
    <div className="contact-admin-container">
      <h1>Update Contact Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={contactDetails.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={contactDetails.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={contactDetails.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Social Links</label>
          <input
            type="text"
            name="youtube"
            placeholder="YouTube"
            value={contactDetails.socialLinks.youtube}
            onChange={handleChange}
          />
          <input
            type="text"
            name="instagram"
            placeholder="Instagram"
            value={contactDetails.socialLinks.instagram}
            onChange={handleChange}
          />
          <input
            type="text"
            name="facebook"
            placeholder="Facebook"
            value={contactDetails.socialLinks.facebook}
            onChange={handleChange}
          />
          <input
            type="text"
            name="twitter"
            placeholder="Twitter"
            value={contactDetails.socialLinks.twitter}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Details</button>
      </form>
    </div>
  );
};

export default ContactAdmin;
