const express = require('express');
const { getWalletBalance, transferMoney } = require('../controllers/walletController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getWalletBalance);
router.post('/transfer', authMiddleware, transferMoney);

module.exports = router;
