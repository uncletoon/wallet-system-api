const user = require('../data/users')
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

    for (const id in user) {
        if(user[id].email === email) {
            return res.status(409).json({
                message: "Email already exists."
            });
        }
    }

    const id = uuid();
    user[id] = {
        id,
        name,
        email,
        created_at: new Date().toLocaleTimeString(),
    };
    console.log("New user is created", user)

    res.status(201).json({
        message: "User created successfully!!",
        user: user[id]
    });
};

const listUsers = (req, res) => {
    res.json(user);
};

module.exports = {
    createUser,
    listUsers
};


