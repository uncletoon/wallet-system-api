// src/services/user.service.js
// src/controllers/user.controller.js

const userService = require("../services/user.service");

async function createUser(req, res) {
  try {
    const { name, email, userId } = req.body;
    const user = await userService.createUser({name, email, userId});

    res.status(201).json({
      message: "User created successfully",
      user: user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function getUsers(req, res){
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
async function updateUser(req, res) {
  try {
    const {id} = req.params;
    const { name, email } = req.body;

    const user = await userService.userUpdadate(id, {name, email});

    res.status(200).json({
      message: `User updated successful.`,
      user: user
    })
  } catch (error) {
    res.status(404).json({message: error.message });
  }
};

async function deleteUser(req, res) {
  try {
    const {id} = req.params;
    await userService.deleteUser(id);

    res.status(200).json({
      message: `User with id: ${id} has been deleted successful.`
    })
  } catch (error) {
    res.status(404).json({message: error.message });
  }
}


async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser
}