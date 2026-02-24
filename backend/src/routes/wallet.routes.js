const express = require('express');
const walletRoutes = express.Router();




const {
    // walletValidator,
    depositValidator,
    withdrawValidator
} = require('../validations/wallet.validator');
const {
    // createWallet,
    getWalletByUserId,
    depositAmount,
    withdrawAmount,
    getAllUserWithWallet
} = require('../controllers/wallet.controller');


// walletRoutes.post('/', walletValidator, createWallet);
walletRoutes.get('/all', getAllUserWithWallet);
walletRoutes.get('/:userId', getWalletByUserId);
walletRoutes.patch('/:id/deposit', depositValidator, depositAmount);
walletRoutes.patch('/:id/withdraw', withdrawValidator, withdrawAmount);


module.exports = walletRoutes;