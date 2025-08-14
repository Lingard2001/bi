const mongoose = require('mongoose');

const DatasetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  columns: [{ type: String }],
  rows: [{ type: Object }], // har bir row - object (key: value)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dataset', DatasetSchema); 