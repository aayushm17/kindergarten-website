const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  albumName: { type: String, required: true, unique: true },
  images: { type: [String], default: [] }, // Store image URLs or paths
},{ collection: "Gallery" });

module.exports = mongoose.model("Gallery", GallerySchema);
