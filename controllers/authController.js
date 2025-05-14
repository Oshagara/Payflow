const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Wallet = require('../models/Wallet');

//Register function to create a new user
// This function checks if the user already exists, hashes the password, and creates a new wallet for the user
// It also saves the user ID in the wallet document
// and the wallet ID in the user document
// If the user is created successfully, it returns a success message
// If the user already exists, it returns an error message
// If there is any other error, it returns a 500 status code with the error message

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const wallet = new Wallet();
    await wallet.save();

    const user = new User({ name, email, password: hashedPassword, wallet: wallet._id });
    await user.save();

    wallet.user = user._id;
    await wallet.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Login function to authenticate users
// This function checks if the user exists in the database and verifies the password


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate('wallet');
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
