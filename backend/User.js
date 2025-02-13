const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  income: { type: Number, default: 0 },
  goals: { type: String, default: '' }
});

module.exports = mongoose.model('User', userSchema);
