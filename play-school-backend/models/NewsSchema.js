const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Add title field
    date: { type: String, required: true }, // Add date field
    time: { type: String, required: true }, // Add time field
    image: { type: Buffer, required: true }, // Image remains as binary data
    description: { type: String, required: true }, // Add description field
  },
  { collection: "News" }
);

module.exports = mongoose.model("News", newsSchema);
