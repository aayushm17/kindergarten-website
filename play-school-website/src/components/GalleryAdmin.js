import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/GalleryAdmin.css";

const GalleryAdmin = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [newAlbumImages, setNewAlbumImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [imagesToAdd, setImagesToAdd] = useState([]);
  const [selectedAlbumImages, setSelectedAlbumImages] = useState([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/gallery/all");
      setAlbums(response.data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  const handleCreateAlbum = async () => {
    const formData = new FormData();
    formData.append("albumName", newAlbumName);
    newAlbumImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await axios.post("http://localhost:5000/api/gallery/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Album created successfully!");
      fetchAlbums();
      setNewAlbumName("");
      setNewAlbumImages([]);
    } catch (error) {
      console.error("Error creating album:", error);
    }
  };

  const handleUpdateAlbum = async () => {
    const formData = new FormData();
    formData.append("albumName", selectedAlbum);
    imagesToAdd.forEach((image) => {
      formData.append("imagesToAdd", image);
    });
    formData.append("imagesToRemove", JSON.stringify(imagesToRemove));

    try {
      await axios.post("http://localhost:5000/api/gallery/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Album updated successfully!");
      fetchAlbums();
      setImagesToAdd([]);
      setImagesToRemove([]);
      setSelectedAlbumImages([]); // Clear selected album images
    } catch (error) {
      console.error("Error updating album:", error);
    }
  };

  const handleDeleteAlbum = async (albumName) => {
    if (!window.confirm(`Are you sure you want to delete the album "${albumName}"?`)) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/gallery/delete/${albumName}`);
      alert("Album deleted successfully!");
      fetchAlbums();
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  const handleAlbumSelect = (e) => {
    const albumName = e.target.value;
    setSelectedAlbum(albumName);
    const selected = albums.find((album) => album.albumName === albumName);
    setSelectedAlbumImages(selected ? selected.images : []);
    setImagesToRemove([]); // Reset images to remove when selecting a new album
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedImage = e.dataTransfer.getData("text/plain");
    setImagesToRemove((prev) => [...prev, droppedImage]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="gallery-admin">
      <h2>Gallery Admin</h2>

      {/* Create New Album */}
      <div className="create-album">
        <h3>Create New Album</h3>
        <input
          type="text"
          placeholder="Album Name"
          value={newAlbumName}
          onChange={(e) => setNewAlbumName(e.target.value)}
        />
        <input
          type="file"
          multiple
          onChange={(e) => setNewAlbumImages([...e.target.files])}
        />
        <button onClick={handleCreateAlbum}>Create Album</button>
      </div>

      {/* Delete Album */}
      <div className="delete-album">
        <h3>Delete Album</h3>
        <select
          value={selectedAlbum}
          onChange={(e) => setSelectedAlbum(e.target.value)}
        >
          <option value="">Select an Album</option>
          {albums.map((album) => (
            <option key={album._id} value={album.albumName}>
              {album.albumName}
            </option>
          ))}
        </select>
        <button
          onClick={() => handleDeleteAlbum(selectedAlbum)}
          disabled={!selectedAlbum}
        >
          Delete Album
        </button>
      </div>

      {/* Existing Albums */}
      <div className="existing-albums">
        <h3>Existing Albums</h3>
        {albums.length === 0 ? (
          <p>No albums available.</p>
        ) : (
          albums.map((album) => (
            <div key={album._id} className="album">
              <h4>{album.albumName}</h4>
              <div className="album-images">
                {album.images.map((image, index) => (
                  <img
                    key={index}
                    src={`data:image/jpeg;base64,${image}`}
                    alt={`img-${index}`}
                    draggable
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/plain", image)
                    }
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Update Album */}
      <div className="update-album">
        <h3>Update Album</h3>
        <select
          value={selectedAlbum}
          onChange={handleAlbumSelect}
        >
          <option value="">Select an Album</option>
          {albums.map((album) => (
            <option key={album._id} value={album.albumName}>
              {album.albumName}
            </option>
          ))}
        </select>
        <input
          type="file"
          multiple
          onChange={(e) => setImagesToAdd([...e.target.files])}
        />
        <div
          className="drop-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            border: "2px dashed #007bff",
            padding: "20px",
            marginBottom: "10px",
            textAlign: "center",
            color: "#007bff",
          }}
        >
          <p>Drag and drop images here to remove</p>
          <p>Images to Remove: {imagesToRemove.length}</p>
        </div>
        <button onClick={handleUpdateAlbum}>Update Album</button>
      </div>

      {/* Display Selected Album Images */}
      {selectedAlbum && (
        <div className="selected-album-images">
          <h4>Images in {selectedAlbum}</h4>
          <div className="album-images">
            {selectedAlbumImages.map((image, index) => (
              <img
                key={index}
                src={`data:image/jpeg;base64,${image}`}
                alt={`selected-img-${index}`}
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData("text/plain", image)
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryAdmin;
