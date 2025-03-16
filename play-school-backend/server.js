const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Basic routes
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Import routes
const authRoutes = require("./routes/auth");
const galleryRoutes = require("./routes/gallery");
const aboutRoutes = require("./routes/aboutRoutes"); // Import About routes
const newsRoutes = require("./routes/NewsRoutes");
const faqRoutes = require("./routes/faqRoutes");
const apiRoutes = require('./routes/HomeRoutes'); 
const contactRoutes = require('./routes/contactRoutes');
// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/about", aboutRoutes); // Add About routes
app.use("/api/news", newsRoutes); // Add News routes
app.use("/api/faqs", faqRoutes);
app.use('/api', apiRoutes);
app.use('/api', contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
