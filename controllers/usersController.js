const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

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

const getUserToken = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Provide email address and password to login"
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: err.message
      });
    }
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const payload = { id: user._id };
        return res.json({
          success: true,
          token: jwt.sign(payload, config.JWT_SECRET)
        });
      }
    }
    return res.status(401).json({
      message: "Wrong login credentials",
      success: false
    });
  });
};

const viewDashboard = (req, res) => {
  return res.json({
    status: "This is the Dashboard",
    user: req.user
  });
};

module.exports = {
  getAllUsers,
  createUser,
  getUserToken,
  viewDashboard
};
