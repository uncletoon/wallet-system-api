const express = require("express");
const router = express.Router();

const {
    depositAmount,
    getTransactions,
    withdrawAmount,
    getWalletById
} = require("../controllers/wallet.controller");

router.post("/:id/deposit", depositAmount);
router.get("/:id/transactions", getTransactions);
router.post("/:id/withdraw", withdrawAmount);
router.get("/:id", getWalletById);

module.exports = router;