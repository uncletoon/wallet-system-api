const accounts = require('../data/accounts')

const createAccount = (req, res) => {
    const {accNo, accName, location, balance} = req.body;

    accounts[accNo] = {accNo, accName, location, balance};

    res.status(201).json({
        Message: "New account created successfully!!",
        account: accounts[accNo]
    })
}

const listAccount = (req, res) => {
    res.json(accounts)
}


module.exports = {
    createAccount,
    listAccount
}