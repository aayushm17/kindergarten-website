const express = require("express");
const multer = require("multer");
const News = require("../models/NewsSchema"); // Adjust the path as necessary

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

// Fetch all news
router.get("/all", async (req, res) => {
  try {
    const newsList = await News.find();

    // Map the news list to include Base64 images
    const newsWithBase64Images = newsList.map((newsItem) => ({
      _id: newsItem._id,
      title: newsItem.title,
      date: newsItem.date,
      time: newsItem.time,
      description: newsItem.description,
      image: newsItem.image ? newsItem.image.toString("base64") : null, // Convert buffer to Base64
    }));

    res.status(200).json(newsWithBase64Images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
});


// Add new news
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { title, date, time, description } = req.body;
    const image = req.file.buffer; // Access image file as buffer

    const news = new News({ title, date, time, image, description });
    await news.save();

    res.status(201).json({ message: "News added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding news", error });
  }
});


// Remove news
router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await News.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "News not found." });
    }
    res.json({ message: "News removed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error removing news", error });
  }
});

// Serve image directly
router.get("/image/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const news = await News.findById(id);
    if (!news || !news.image) {
      return res.status(404).json({ message: "Image not found." });
    }
    res.set("Content-Type", "image/jpeg"); // Set the content type
    res.send(news.image); // Send the image buffer directly
  } catch (error) {
    res.status(500).json({ message: "Error fetching image", error });
  }
});

module.exports = router;