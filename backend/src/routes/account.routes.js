const express = require('express');
const accRoutes = express.Router()

const {
    createAccount,
    listAccount

} = require('../controllers/account.controller')

accRoutes.post('/', createAccount);
accRoutes.get('/', listAccount);

module.exports = accRoutes