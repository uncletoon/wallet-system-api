const users = require('../data/users')
const { uuid } = require('uuidv4')

const createUser = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400).json({
            message: "Please, name and email are required"
        });
    }

    if (typeof name !== "string" || typeof email !== "string") {
        return res.status(400).json({
            message: "Invalid data type"
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }

    for (const id in users) {
        if (users[id].email === email) {
            return res.status(409).json({
                message: "Email already exists."
            });
        }
    }

    const id = uuid();
    users[id] = {
        id,
        name,
        email,
        created_at: new Date().toLocaleTimeString(),
    };
    console.log("New user is created", users)

    res.status(201).json({
        message: "User created successfully!!",
        user: users[id]
    });
};

const listUsers = (req, res) => {
    return res.json(users);
};


const getUserById = (req, res) => {
    const { id } = req.params;

    const singleUser = users[id]
    if (!singleUser) {
        return res.status(400).json({
            message: "User not found"
        });
    }

    res.status(200).json(singleUser);
};



module.exports = {
    createUser,
    listUsers,
    getUserById
};


