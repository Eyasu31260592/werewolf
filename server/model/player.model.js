// models/Player.js
const mongoose = require('mongoose');

const mateInfoSchema = new mongoose.Schema({
  name: String,
  id: String,
}, { _id: false });

const playerSchema = new mongoose.Schema({
  _id:{ type: String, required: true },
  name: { type: String, required: true },
  profilePic: { type: String},
  role: { type: String},
  mate: { type: Boolean, default: false },
  mateInfo: { type: mateInfoSchema, default: null },
  vote: { type: Number, default: 0 },
  dead: { type: Boolean, default: false },
  self: { type: Boolean, default: false },

  // 🔗 Foreign key reference to game
  gameId: { type: String, required: true, ref: 'Game' }
}, { timestamps: true  ,_id: false});

module.exports = mongoose.model('Player', playerSchema);
