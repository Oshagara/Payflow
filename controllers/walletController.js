const Wallet = require('../models/Wallet');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.getWalletBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wallet');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ 
        walletId: user.wallet._id,
        balance: user.wallet.balance
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.transferMoney = async (req, res) => {
  const { receiverEmail, amount } = req.body;

  try {
    const sender = await User.findById(req.user.id).populate('wallet');
    const receiver = await User.findOne({ email: receiverEmail }).populate('wallet');

    if (!receiver) return res.status(404).json({ message: "Receiver not found" });
    if (sender.wallet.balance < amount) return res.status(400).json({ message: "Insufficient funds" });

    // Debit sender
    sender.wallet.balance -= amount;
    await sender.wallet.save();

    // Credit receiver
    receiver.wallet.balance += amount;
    await receiver.wallet.save();

    // Log transactions
    const transaction = new Transaction({
      sender: sender._id,
      receiver: receiver._id,
      amount,
      type: 'transfer',
    });

    await transaction.save();

    res.json({ message: `Transferred ₦${amount} to ${receiverEmail}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};