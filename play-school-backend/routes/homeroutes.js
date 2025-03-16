const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const router = express.Router();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Define Schemas
const HeaderSchema = new mongoose.Schema({
  headerTopText: { type: String, required: true },
}, { collection: "Header" });

const HeroImageSchema = new mongoose.Schema({
  image: { type: String, required: true },
}, { collection: "HomeImage" });

const BoxSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  image: { type: String},
}, { collection: "HomeBox" });

// Models
const Header = mongoose.model('Header', HeaderSchema);
const HeroImage = mongoose.model('HeroImage', HeroImageSchema);
const Box = mongoose.model('Box', BoxSchema);

// Configure Multer for File Upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes

// Update Header Top Text
router.post('/header-top', async (req, res) => {
  const { headerTopText } = req.body;
  const existingHeader = await Header.findOne();
  if (existingHeader) {
    existingHeader.headerTopText = headerTopText;
    await existingHeader.save();
  } else {
    await Header.create({ headerTopText });
  }
  res.json({ message: 'Header updated successfully' });
});

// Fetch Header Top Text
router.get('/header-top', async (req, res) => {
  const header = await Header.findOne();
  res.json(header || { headerTopText: '' });
});

// Upload Hero Image
router.post('/hero-image', upload.single('image'), async (req, res) => {
  const { buffer } = req.file;
  const image = buffer.toString('base64');
  await HeroImage.create({ image });
  res.json({ message: 'Hero image uploaded successfully' });
});

// Fetch Hero Images
router.get('/hero-image', async (req, res) => {
  const images = await HeroImage.find();
  res.json(images);
});

// Delete Hero Image
router.delete('/hero-image/:id', async (req, res) => {
  await HeroImage.findByIdAndDelete(req.params.id);
  res.json({ message: 'Hero image deleted successfully' });
});

// Update Box
router.post('/box', upload.single('image'), async (req, res) => {
    const { title, subtitle, id } = req.body;
    const buffer = req.file ? req.file.buffer.toString('base64') : null;
  
    let box = await Box.findById(id);
    if (box) {
      box.title = title;
      box.subtitle = subtitle || box.subtitle;
      if (buffer) {
        box.image = buffer; // Only update the image if a new one is provided
      }
      await box.save();
      res.json({ message: 'Box updated successfully' });
    } else {
      if (!buffer) {
        return res.status(400).json({ error: 'Image is required for new boxes' });
      }
      const image = buffer || '';
      await Box.create({ title, subtitle, image });
      res.json({ message: 'Box created successfully' });
    }
  });

// Fetch Boxes
router.get('/box', async (req, res) => {
  // Ensure only three boxes exist in the database
  let boxes = await Box.find();
  if (boxes.length < 3) {
    const placeholders = 3 - boxes.length;
    for (let i = 0; i < placeholders; i++) {
      const newBox = await Box.create({
        title: `Default Title ${i + 1}`,
        subtitle: `Default Subtitle ${i + 1}`,
        image: '',
      });
      boxes.push(newBox);
    }
  }
  boxes = await Box.find(); // Re-fetch updated boxes
  res.json(boxes.slice(0, 3)); // Return only three boxes
});

// Delete Box (disabled as only 3 boxes should exist)
router.delete('/box/:id', async (req, res) => {
  res.status(403).json({ message: 'Box deletion is not allowed' });
});

module.exports = router;
