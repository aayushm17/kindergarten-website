import React, { useState, useEffect } from "react";
import "../styles/About.css";

const About = () => {
  const [banner, setBanner] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/about/fetch");
        if (response.ok) {
          const data = await response.json();
          setBanner(`data:image/png;base64,${data.banner}`); // Decode base64 banner
          setText(data.text);
        } else {
          console.error("Failed to fetch About section.");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <div className="about">
      <div className="about-header">
        <img src={banner} alt="About Us" className="about-image" />
      </div>
      <div className="about-content">
        <h1>About Us</h1>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default About;
