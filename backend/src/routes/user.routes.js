const express = require('express');
const userRouter = express.Router();


const {
    createUser,
    listUsers,
    getUserById
} = require("../controllers/user.controller")

userRouter.post("/", createUser)
userRouter.get("/", listUsers)
userRouter.get('/:id', getUserById)



module.exports = userRouter;