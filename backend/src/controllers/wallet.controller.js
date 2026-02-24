const wallets = require("../data/wallet.json");
const users = require("../data/user.json");
const transactions = require("../data/transactions");
const { uuid } = require("uuidv4");
const validator = require("validator");
const fs = require("fs");
const path = require("path");

// //create a wallet
// const createWallet = (req, res) => {
//   const { userId, balance } = req.body;

//   const wallet = {
//     id: uuid(),
//     userId,
//     balance,
//     created_at: new Date().toLocaleString(),
//   };

//   wallets.push(wallet);
//   console.log("wallet created:", wallet);

//   res.status(201).json({
//     message: "New wallet created Successfully!",
//     wallet: wallet,
//   });
// };

// get user by the userID
const getWalletByUserId = (req, res) => {
  let { userId } = req.params;

  userId = validator.toInt(userId);
  const wallet = wallets.find((w) => w.userId === userId);

  if (!wallet) {
    return res.status(404).json({
      message: "Account Not Found",
    });
  }

  res.status(200).json(wallet);
  console.log(`WALLET WITH ID: ${userId}  FOUND`);
};

// Helper to generate unique transaction id (simple)
const generateTransactionId = () => Date.now().toString();

//deposit
const depositAmount = (req, res) => {
  const { id } = req.params;
  let { amount } = req.body;

  const walletsPath = path.join(__dirname, "../data/wallet.json");
  const wallets = JSON.parse(fs.readFileSync(walletsPath, "utf-8"));

  const walletIndex = wallets.findIndex((w) => w.id === id);

  wallets[walletIndex] = {
    ...wallets[walletIndex],
    balance,
    updated_at: new Date().toLocaleString(),
  };

  fs.writeFileSync(walletsPath, JSON.stringify(wallets, null, 2));

  console.log(`Deposit sucessfully!!, The New balance is ${wallets[walletIndex].balance}`);

  res.status(200).json({
    message: "DEPOSIT SUCESSFUL!!",
    wallet: wallets[walletIndex],
  });
};

//Withdraw
const withdrawAmount = (req, res) => {
  const { id } = req.params;

  const walletsPath = path.join(__dirname, "../data/wallet.json");
  const wallets = JSON.parse(fs.readFileSync(walletsPath, "utf-8"));

  const walletIndex = wallets.findIndex((w) => w.id === id);

  wallets[walletIndex] = {
    ...wallets[walletIndex],
    balance,
    updated_at: new Date().toLocaleString(),
  };

  fs.writeFileSync(walletsPath, JSON.stringify(wallets, null, 2));

  console.log(`Withdraw Successful!`);
  console.log(`Now the balance is: ${wallets[walletIndex].balance}`);

  res.status(200).json({
    message: "WITHDRAW SUCESSFUL!!",
    wallet: wallets[walletIndex],
  });
};

//Retrieve all user with wallet
const getAllUserWithWallet = (req, res) => {
  const result = users.map((user) => {
    const wallet = wallets.find((w) => w.userId === user.userId);
    return {
      id: user.id,
      userId: user.userId,
      name: user.name,
      email: user.email,
      balance: wallet ? wallet.balance : 0,
    };
  });
  res.status(200).json({
    user: result,
  });
};

module.exports = {
//   createWallet,
  getWalletByUserId,
  depositAmount,
  withdrawAmount,
  getAllUserWithWallet,
};
