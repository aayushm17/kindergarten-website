const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Define the FAQ schema and model
const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
},{ collection: "FAQs" });

const FAQ = mongoose.model("FAQ", faqSchema);

// API to post a new FAQ
router.post("/add", async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFAQ = new FAQ({ question, answer });
    await newFAQ.save();
    res.status(201).json({ message: "FAQ added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to fetch all FAQs
router.get("/all", async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// API to update an existing FAQ by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );
    if (!updatedFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json({ message: "FAQ updated successfully!", updatedFAQ });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to delete an FAQ by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFAQ = await FAQ.findByIdAndDelete(id);
    if (!deletedFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json({ message: "FAQ deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
