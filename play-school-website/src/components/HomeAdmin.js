import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeAdmin = () => {
  const [headerTopText, setHeaderTopText] = useState('');
  const [heroImages, setHeroImages] = useState([]);
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    fetchHeaderTop();
    fetchHeroImages();
    fetchBoxes();
  }, []);

  const fetchHeaderTop = async () => {
    const response = await axios.get('http://localhost:5000/api/header-top');
    setHeaderTopText(response.data?.headerTopText || '');
  };

  const updateHeaderTop = async () => {
    await axios.post('http://localhost:5000/api/header-top', { headerTopText });
    alert('Header top updated!');
  };

  const fetchHeroImages = async () => {
    const response = await axios.get('http://localhost:5000/api/hero-image');
    setHeroImages(response.data);
  };

  const uploadHeroImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    await axios.post('http://localhost:5000/api/hero-image', formData);
    fetchHeroImages();
  };

  const deleteHeroImage = async (id) => {
    await axios.delete(`http://localhost:5000/api/hero-image/${id}`);
    fetchHeroImages();
  };

  const fetchBoxes = async () => {
    const response = await axios.get('http://localhost:5000/api/box');
    setBoxes(response.data);
  };

  const updateBox = async (id, title, subtitle, file) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('id', id);
      if (file) formData.append('image', file);

      await axios.post('http://localhost:5000/api/box', formData);
      fetchBoxes();
    } catch (error) {
      console.error('Error updating box:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Failed to update box');
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <h3>Update Header Top</h3>
        <input
          type="text"
          value={headerTopText}
          onChange={(e) => setHeaderTopText(e.target.value)}
        />
        <button onClick={updateHeaderTop}>Update</button>
      </div>

      <div>
        <h3>Manage Hero Images</h3>
        <input type="file" onChange={(e) => uploadHeroImage(e.target.files[0])} />
        <ul>
          {heroImages.map((img) => (
            <li key={img._id}>
              <img src={`data:image/png;base64,${img.image}`} alt="Hero" width="100" />
              <button onClick={() => deleteHeroImage(img._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Manage Boxes</h3>

        {/* Commenting out Add New Box Section */}
        {/*
        <div>
          <h4>Add New Box</h4>
          <input
            type="text"
            placeholder="Enter title"
            onChange={(e) => setNewBoxTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter subtitle"
            onChange={(e) => setNewBoxSubtitle(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setNewBoxImage(e.target.files[0])}
          />
          <button
            onClick={() => {
              if (!newBoxImage) {
                alert('Image is required for creating a new box.');
                return;
              }
              updateBox(null, newBoxTitle, newBoxSubtitle, newBoxImage);
            }}
          >
            Add Box
          </button>
        </div>
        */}

        {/* Existing Boxes */}
        {boxes.length === 0 ? (
          <p>No boxes found. Add a new one using the above form.</p>
        ) : (
          boxes.map((box) => (
            <div key={box._id} style={{ marginBottom: '1rem' }}>
              {/* <h4>Box ID: {box._id}</h4> */}
              <input
                type="text"
                defaultValue={box.title}
                onChange={(e) => (box.title = e.target.value)}
              />
              <input
                type="text"
                defaultValue={box.subtitle}
                onChange={(e) => (box.subtitle = e.target.value)}
              />
              <input
                type="file"
                onChange={(e) => (box.newImage = e.target.files[0])}
              />
              <img src={`data:image/png;base64,${box.image}`} alt="Box" width="100" />
              <button
                onClick={() =>
                  updateBox(box._id, box.title, box.subtitle, box.newImage)
                }
              >
                Update Box
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeAdmin;
