const express = require('express');
const router = express.Router();
// const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    // MongoDB siz ishlash uchun
    res.status(201).json({ message: 'User created (MongoDB siz)' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // MongoDB siz ishlash uchun
    const token = jwt.sign({ userId: 'test' }, process.env.JWT_SECRET || 'test', { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Google login
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;
    // MongoDB siz ishlash uchun
    const token = jwt.sign({ userId: 'google-test' }, process.env.JWT_SECRET || 'test', { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: 'Google auth failed' });
  }
});

// GitHub login
router.post('/github', async (req, res) => {
  try {
    const { code } = req.body;
    // MongoDB siz ishlash uchun
    const token = jwt.sign({ userId: 'github-test' }, process.env.JWT_SECRET || 'test', { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: 'GitHub auth failed', error: err.message });
  }
});

module.exports = router; 