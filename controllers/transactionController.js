const Transaction = require('../models/Transaction');

exports.getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { sender: req.user.id },
        { receiver: req.user.id }
      ]
    }).sort({ timestamp: -1 });

    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
