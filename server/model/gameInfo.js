const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  _id: { type: String, required: true }, 
  hostName: { type: String, required: true }

}, { timestamps: true, _id: false });

module.exports = mongoose.model('Game', gameSchema);
