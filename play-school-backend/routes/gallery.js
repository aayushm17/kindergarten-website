const express = require("express");
const multer = require("multer");
const Gallery = require("../models/GallerySchema");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Create a new album with image uploads
router.post("/create", upload.array("images"), async (req, res) => {
  try {
    const { albumName } = req.body;

    // Convert uploaded files to base64 format
    const images = req.files.map((file) => file.buffer.toString("base64"));

    const newAlbum = new Gallery({ albumName, images });
    await newAlbum.save();
    res.status(201).send("Album created successfully!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all albums
router.get("/all", async (req, res) => {
  try {
    const albums = await Gallery.find();
    res.status(200).json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete an album
router.delete("/delete/:albumName", async (req, res) => {
  try {
    const { albumName } = req.params;

    const deletedAlbum = await Gallery.findOneAndDelete({ albumName });
    if (!deletedAlbum) {
      return res.status(404).send("Album not found");
    }

    res.status(200).send("Album deleted successfully!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update album (add/remove images)
router.post("/update", upload.array("imagesToAdd"), async (req, res) => {
  try {
    const { albumName, imagesToRemove = [] } = req.body;

    const album = await Gallery.findOne({ albumName });
    if (!album) return res.status(404).send("Album not found");

    // Add new images
    if (req.files) {
      const newImages = req.files.map((file) => file.buffer.toString("base64"));
      album.images.push(...newImages);
    }

    // Remove specified images
    album.images = album.images.filter((img) => !imagesToRemove.includes(img));

    await album.save();
    res.status(200).send("Album updated successfully!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
