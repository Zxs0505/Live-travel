const mongoose = require('mongoose');
const ConcertSchema = new mongoose.Schema({
  tmId:     { type: String, required: true, unique: true },
  name:     String,
  date:     String,
  venue:    String,
  city:     String,
  genre:    String,
  cachedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Concert', ConcertSchema);
