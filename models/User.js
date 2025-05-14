const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet'
  }
});

module.exports = mongoose.model('User', UserSchema);
