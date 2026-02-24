const users = require("../data/user.json");
const validator = require("validator");

const userValidator = (req, res, next) => {
  let { userId, name, email } = req.body;

  //sinitize/cleanning.
  userId = validator.trim(String(userId ?? ""));
  name = validator.trim(String(name ?? ""));
  email = validator.trim(String(email ?? ""));

  //check empty
  if (validator.isEmpty(userId)) {
    return res.status(400).json({
      message: "User ID must be provided",
    });
  }

  if (validator.isEmpty(name)) {
    res.status(400).json({
      message: "Name must be provided",
    });
    return;
  }
  if (validator.isEmpty(email)) {
    res.status(400).json({
      message: "Email must be provided",
    });
    return;
  }

  //validate type
  if (!validator.isInt(userId)) {
    return res.status(400).json({
      message: "User ID must be an Integer",
    });
  }
  if (typeof name !== "string") {
    res.status(400).json({
      message: "Name must be a string",
    });
    return;
  }
  if (!validator.isEmail(email)) {
    res.status(400).json({
      message: "Wrong email format",
    });
    return;
  }

  //Convert
  userId = validator.toInt(userId);

  //Check if the user with userId exist
  const emailExist = users.find((u) => u.email === email);
  if (emailExist) {
    return res.status(409).json({
      message: "Email already exist!",
    });
  }
  
  const userIdExist = users.find((u) => u.userId === userId);
  if (userIdExist) {
    return res.status(409).json({
      message: "User whi this ID already exist!",
    });
  }
  //Save cleaned data
  req.body.userId = userId;
  req.body.name = name;

  next();
};


module.exports = userValidator;