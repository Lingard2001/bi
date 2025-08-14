const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
const corsOptions = {
  origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : true,
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
const authRoutes = require('./routes/auth');
const datasetRoutes = require('./routes/datasets');

app.use('/api/auth', authRoutes);
app.use('/api/datasets', datasetRoutes);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server ishlayapti!' });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
}); 