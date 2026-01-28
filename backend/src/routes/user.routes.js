const express = require('express');
const userRouter = express.Router();


const {
    createUser,
    listUsers
} = require("../controllers/user.controller")

userRouter.post("/", createUser)
userRouter.get("/", listUsers)



module.exports = userRouter;