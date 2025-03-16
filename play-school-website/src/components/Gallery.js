import React, { useState, useEffect } from "react";
import "../styles/Gallery.css";

const Gallery = () => {
  const [albums, setAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch albums from API
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/gallery/all");
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  // Open modal for a specific album
  const openModal = (album) => {
    setCurrentAlbum(album);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAlbum(null);
  };

  // Handle clicks outside the modal content
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal();
    }
  };

  return (
    <div className="gallery-container">
      <h1>Gallery</h1>
      <p>Our multi-level kindergarten caters to the age groups 2-5 years with a curriculum focusing on children.</p>
      <div className="gallery-grid">
        {albums.map((album) => (
          <div
            key={album._id}
            className="slideshow"
            onClick={() => openModal(album)}
          >
            {/* Convert base64 image to data URI */}
            <img
              src={`data:image/jpeg;base64,${album.images[0]}`}
              alt={album.albumName}
              className="slideshow-image"
            />
            <p>{album.albumName}</p>
          </div>
        ))}
      </div>

      {isModalOpen && currentAlbum && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>
              &times;
            </button>
            <h2>{currentAlbum.albumName}</h2>
            <div className="modal-images">
              {currentAlbum.images.map((image, index) => (
                <img
                  key={index}
                  src={`data:image/jpeg;base64,${image}`}
                  alt={`Image ${index + 1}`}
                  className="modal-image"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
