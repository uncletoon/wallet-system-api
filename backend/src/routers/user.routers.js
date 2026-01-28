const express = require('express');
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send("List of users")
})



module.exports = userRouter;