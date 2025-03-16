import React, { useState, useEffect } from "react";
import "../styles/HeroSection.css";
import axios from "axios";

const HeroSection = () => {
  const [heroImages, setHeroImages] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHeroImages = async () => {
      const response = await axios.get("http://localhost:5000/api/hero-image");
      setHeroImages(response.data);
    };

    const fetchBoxes = async () => {
      const response = await axios.get("http://localhost:5000/api/box");
      setBoxes(response.data);
    };

    fetchHeroImages();
    fetchBoxes();
  }, []);

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [heroImages]);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h4>Kindergarten Program</h4>
        <h1>Best Children's Education Curriculum</h1>
        <p>Admission Open 20–24 April</p>
        <a href="/login" className="apply-button">
          Login
        </a>
      </div>
      <div className="hero-image">
        {heroImages.length > 0 && (
          <img
            src={`data:image/png;base64,${heroImages[currentIndex].image}`}
            alt={`Hero ${currentIndex}`}
          />
        )}
      </div>
      <div className="hero-content3">
        {boxes.map((box, index) => (
          <div key={index} className={`box${index + 1}`}>
            <img src={`data:image/png;base64,${box.image}`} alt={`Box ${index}`} />
            <h4>{box.title}</h4>
            <p>{box.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
