const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getAllUsers = (req, res) => {
  User.find({}, "name jobTitle email", (err, users) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: err.message
      });
    }
    return res.json(users);
  });
};

const createUser = (req, res) => {
  const { name, email, password, jobTitle, jobDesignation } = req.body;
  let pwd_hash;
  if (password) {
    pwd_hash = bcrypt.hashSync(req.body.password, 10);
  }
  const newUser = new User({
    name,
    email,
    password: pwd_hash,
    jobTitle,
    jobDesignation
  });

  newUser.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.message
      });
    }
    newUser.password = undefined; // to avoid returning the password
    return res.status(201).json({
      message: "User created successfully!",
      user
    });
  });
};

module.exports = {
  getAllUsers,
  createUser
};
