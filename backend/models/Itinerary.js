const mongoose = require('mongoose');
const ItinerarySchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:       { type: String, required: true },
  items:       [{ concert: { type: mongoose.Schema.Types.ObjectId, ref: 'Concert' }, dateAdded: Date }],
  lastModified:{ type: Date, default: Date.now }
});
module.exports = mongoose.model('Itinerary', ItinerarySchema);
