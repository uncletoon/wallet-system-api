const express = require('express');
const userRouter = express.Router();

const {userValidator} = require('../validations/user.validator');

const {
    createUser,
    // listUsers,
    // getUserById,
    // updateUser
} = require("../controllers/user.controller")

userRouter.post("/", userValidator, createUser);
// userRouter.get("/", listUsers)
// userRouter.get('/:userId', getUserById)
// userRouter.patch('/:id', updateUser)



module.exports = userRouter;