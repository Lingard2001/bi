const express = require('express');
const router = express.Router();
const multer = require('multer');
const Papa = require('papaparse');

// Multer memory storage (file diskda saqlanmaydi)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET /api/datasets - barcha datasetlarni olish
router.get('/', async (req, res) => {
  try {
    // MongoDB siz ishlash uchun
    res.json([]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/datasets - yangi dataset qo'shish (json orqali)
router.post('/', async (req, res) => {
  try {
    // MongoDB siz ishlash uchun
    res.status(201).json({ message: 'Dataset qo\'shildi (MongoDB siz)' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/datasets/upload - CSV fayl yuklash
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const csv = req.file.buffer.toString('utf-8');
    const parsed = Papa.parse(csv, { header: true });
    const columns = parsed.meta.fields;
    const rows = parsed.data.filter(row => Object.values(row).some(v => v !== ''));
    
    // MongoDB siz ishlash uchun
    res.status(201).json({ 
      message: 'CSV yuklandi (MongoDB siz)',
      columns,
      rows: rows.slice(0, 10) // faqat birinchi 10 qator
    });
  } catch (err) {
    res.status(500).json({ message: 'CSV upload error', error: err.message });
  }
});

module.exports = router; 