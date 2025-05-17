const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const walletRoutes = require('./routes/walletRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const cors = require('cors');



dotenv.config();
connectDB();
    
const app = express();
app.use(express.json());
app.use(cors()); // Allow all origins by default

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

  app.use(express.urlencoded({ extended: true }));
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
app.use('/auth', authRoutes);
app.use('/wallet', walletRoutes);
app.use('/transactions', transactionRoutes);

// Wallet and Transaction routes will come next
module.exports = app;
