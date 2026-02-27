const walletService = require("../services/wallet.service");
const walletModel = require("../models/wallet.model");
const transactionModel = require("../models/transaction.model");

async function depositAmount(req, res) {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const newBalance = await walletService.deposit(id, amount);

    res.status(200).json({
      message: "Deposit successful",
      balance: newBalance
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function withdrawAmount(req, res) {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const newBalance = await walletService.withdraw(id, amount);

    res.status(200).json({
      message: "Withdraw Sucessful",
      balance: newBalance
    });
  } catch(err) {
    res.status(400).json({error: err.message});
  }
}

async function getTransactions(req, res) {
  try {
    const { id } = req.params;

    const transactions = await transactionModel.getTransactionsByWallet(id);
    
    res.json(transactions);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getWalletById(req, res) {
  try {
    const { id } = req.params;

    const wallet = await walletModel.findWalletById(id);
    if (!wallet) throw new Error("Wallet not found.");

    res.status(200).json(wallet)
  }  catch (err) {
    res.status(400).json({ error: err.message });
  }
  
}

module.exports = {
  depositAmount,
  getTransactions,
  withdrawAmount,
  getWalletById
};