import React, { useState, useEffect } from "react";
import "../styles/AboutAdmin.css";

const AboutAdmin = () => {
  const [bannerPreview, setBannerPreview] = useState(null); // Preview of the existing or uploaded banner
  const [banner, setBanner] = useState(null); // Uploaded banner file
  const [text, setText] = useState(""); // About text
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch existing "About" section when the component mounts
  useEffect(() => {
    const fetchAboutSection = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/about/fetch");
        if (response.ok) {
          const data = await response.json();
          setBannerPreview(`data:image/jpeg;base64,${data.banner}`); // Load banner preview
          setText(data.text); // Load text
        } else {
          console.error("Failed to fetch About section.");
        }
      } catch (err) {
        console.error("An error occurred:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutSection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (banner) formData.append("banner", banner); // Append new banner if uploaded
    formData.append("text", text); // Append text

    try {
      const response = await fetch("http://localhost:5000/api/about/post", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("About section updated successfully!");
        // Optionally, refresh the page or fetch the updated data
      } else {
        alert("Failed to update About section.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };

  return (
    <div className="about-admin">
      <h2>Update About Section</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Current Banner:</label>
            {bannerPreview ? (
              <img src={bannerPreview} alt="Current Banner" className="banner-preview" />
            ) : (
              <p>No banner uploaded.</p>
            )}
          </div>
          <div>
            <label>Update Banner (optional):</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setBanner(e.target.files[0]);
                setBannerPreview(URL.createObjectURL(e.target.files[0])); // Update preview
              }}
            />
          </div>
          <div>
            <label>About Text:</label>
            <textarea
              rows="6"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Update About Section</button>
        </form>
      )}
    </div>
  );
};

export default AboutAdmin;
