const express = require('express');
const userRouter = express.Router();
const userController = require("../controllers/user.controller")

const {userValidator} = require('../validations/user.validator');


userRouter.route('/')
.post(userValidator, userController.createUser)
.get(userController.getUsers)


userRouter.route('/:id')
.get(userController.getUser)
.delete(userController.deleteUser)
.patch(userController.updateUser);
// userRouter.patch('/:id', updateUser)



module.exports = userRouter;