const wallets = require("../data/wallet.json");
const users = require("../data/user.json");

const validator = require("validator");

const walletValidator = (req, res, next) => {
  let { userId, amount: balance } = req.body;

  //sinitize/cleanning.
  userId = validator.trim(String(userId ?? ""));
  balance = validator.trim(String(balance ?? ""));

  //check empty
  if (validator.isEmpty(userId)) {
    return res.status(400).json({
      message: "User ID must be provided",
    });
  }

  if (validator.isEmpty(balance)) {
    res.status(400).json({
      message: "The amount must be provided",
    });
    return;
  }

  //validate type
  if (!validator.isInt(userId)) {
    return res.status(400).json({
      message: "User ID must be an Integer",
    });
  }
  if (!validator.isNumeric(balance)) {
    res.status(400).json({
      message: "The amount must be a Number",
    });
    return;
  }
  if (balance < 0) {
    res.status(400).json({
      message: "Please, Deposit a Positive Money",
    });
    return;
  }

  //Convert
  userId = validator.toInt(userId);
  balance = validator.toFloat(balance);

  //Check if the user with userId exist
  const currentUser = users.find((u) => u.userId === userId);
  if (!currentUser) {
    res.status(400).json({
      message: "User ID Not exist.",
    });
    return;
  }

  //Check if wallet already exist
  const walletExist = wallets.find((w) => w.userId === userId);
  if (walletExist) {
    res.status(409).json({
      message: "Wallet with this user ID is already exist.",
    });

    console.log(`Account with this user ID: ${userId} is already exist.`);
    return;
  }

  //Save cleaned data
  req.body.userId = userId;
  req.body.balance = balance;

  next();
};

const depositValidator = (req, res, next) => {
  const { id } = req.params;
  let { amount: newBalance } = req.body;

  //clean
  newBalance = validator.trim(String(newBalance ?? ""));

  //check empty
  if (validator.isEmpty(newBalance) || newBalance === "0") {
    res.status(400).json({
      message: "The amount must be provided",
    });
    return;
  }

  // Validate
  if (!validator.isNumeric(newBalance)) {
    res.status(400).json({
      message: "The amount must be a Number",
    });
    return;
  }
  if (newBalance < 0) {
    res.status(400).json({
      message: "The amount must be a Positive Number",
    });
    return;
  }

  //Convert
  newBalance = validator.toFloat(newBalance);

  const walletIndex = wallets.findIndex((w) => w.id === id);
  if (walletIndex === -1) {
    return res.status(404).json({
      message: "Account Not Found",
    });
  }
  let initialBalance = wallets[walletIndex].balance;
  let updatedBalance = initialBalance + newBalance;

  balance = updatedBalance;
  next();
};

const withdrawValidator = (req, res, next) => {
  const { id } = req.params;
  let { amount: newBalance } = req.body;

  //clean
  newBalance = validator.trim(String(newBalance ?? ""));

  //check empty
  if (validator.isEmpty(newBalance) || newBalance === "0") {
    res.status(400).json({
      message: "The amount must be provided",
    });
    return;
  }

  // Validate
  if (!validator.isNumeric(newBalance)) {
    res.status(400).json({
      message: "The amount must be a Number",
    });
    return;
  }
  if (newBalance < 0) {
    res.status(400).json({
      message: "The amount must be a Positive Number",
    });
    return;
  }

  //Convert
  newBalance = validator.toFloat(newBalance);

  const walletIndex = wallets.findIndex((w) => w.id === id);
  if (walletIndex === -1) {
    return res.status(404).json({
      message: "Account Not Found",
    });
  }
  let initialBalance = wallets[walletIndex].balance;
  let updatedBalance = initialBalance - newBalance;

  balance = updatedBalance;
  next();
};

module.exports = {
  walletValidator,
  depositValidator,
  withdrawValidator,
};