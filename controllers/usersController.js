const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Task = require("../models/Task");
const { Employee } = require("../models/Employee");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name jobTitle email");
    return res.json(users);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message
    });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, jobTitle, jobDesignation } = req.body;
  try {
    let pwd_hash;
    if (password) {
      pwd_hash = bcrypt.hashSync(req.body.password, 10);
    }
    const newUser = await User.create({
      name,
      email,
      password: pwd_hash,
      jobTitle,
      jobDesignation
    });
    // create associated employee account
    await Employee.create({ user: newUser });

    newUser.password = undefined; // to avoid returning the password
    return res.status(201).json({
      message: "User created successfully!",
      user: newUser
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message
    });
  }
};

const getUserToken = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Provide email address and password to login"
    });
  }

  try {
    const user = await User.findOne({ email });
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
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message
    });
  }
};

const viewDashboard = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    return res.json({
      status: "This is the Dashboard",
      user: req.user,
      tasks
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserToken,
  viewDashboard
};
