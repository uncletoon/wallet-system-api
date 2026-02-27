const { createUserWithWallet } = require("../services/user.service");

async function createUser(req, res) {
  try {
    const { name, email, userId } = req.body;

    const result = await createUserWithWallet(name, email, userId);

    res.status(201).json({
      message: "User and wallet created successfully",
      ...result,
    });

  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
}

module.exports = {
  createUser,
};



// // List all users

// const listUsers = (req, res) => {
//   const usersPath = path.join(__dirname, "../data/user.json");
//   const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

//   return res.json(users);
// };

// // Update a user
// const updateUser = (req, res) => {
//   const { id } = req.params;

//   const usersPath = path.join(__dirname, "../data/user.json");
//   const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"))

//   const userIndex = users.findIndex((u) => u.id == id);
//   if (userIndex === -1) {
//     return res.status(404).json({
//       message: "User not found",
//     });
//   }

//   const ALLOWED_KEY = ["name", "email"];
//   const updates = {};

//   for (const key of ALLOWED_KEY) {
//     if (req.body[key] !== undefined) {
//       if (key === "name" && typeof req.body[key] !== "string") {
//         return res.status(400).json({
//           message: "Invalid name.",
//         });
//       }

//       if (key === "email" && !req.body[key].includes("@")) {
//         return res.status(400).json({
//           message: "Invalid email.",
//         });
//       }

//       updates[key] = req.body[key];
//     }
//   }

//   users[userIndex] = {
//     ...users[userIndex],
//     ...updates,
//     updated_at: new Date().toLocaleTimeString(),
//   };
//   fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

//   res.status(200).json({
//     message: "User updated successfully!!",
//     user: users[userIndex],
//   });
//   console.log("User updated Successfully:", users[userIndex]);
// };

// // Get user by ID

// const getUserById = (req, res) => {
//   const { userId } = req.params;
  
//   const singleUser = users.find((u) => u.userId == userId);
//   if (!singleUser) {
//     return res.status(400).json({
//       message: "User not found",
//     });
//   }

//   res.status(200).json(singleUser);
// };

module.exports = {
  createUser,
//   listUsers,
//   getUserById,
//   updateUser,
 };
