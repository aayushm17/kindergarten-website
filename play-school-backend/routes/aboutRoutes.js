const express = require("express");
const multer = require("multer");
const About = require("../models/AboutSchema");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

// Fetch the About Section
router.get("/fetch", async (req, res) => {
  try {
    const about = await About.findOne(); // Assuming only one about section
    if (!about) return res.status(404).json({ message: "About section not found" });

    res.status(200).json({
      banner: about.banner.toString("base64"), // Convert buffer to base64
      text: about.text,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post the About Section
// Post (Update) the About Section
router.post("/post", upload.single("banner"), async (req, res) => {
  try {
    const { text } = req.body;
    const banner = req.file?.buffer; // Check if a new banner is provided

    // Find the existing About section
    let about = await About.findOne();
    if (!about) {
      about = new About();
    }

    // Update only the provided fields
    if (text) about.text = text;
    if (banner) about.banner = banner;

    await about.save();
    res.status(200).json({ message: "About section updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
