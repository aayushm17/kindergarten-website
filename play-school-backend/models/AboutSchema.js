const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  banner: { type: Buffer, required: true }, // Store the banner as binary data
  text: { type: String, required: true },
}, { collection: "About" });

module.exports = mongoose.model("About", aboutSchema);
