const User = require("../models/User");

const getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: err.message
      });
    }
    return res.json(users);
  });
};

module.exports = {
  getAllUsers
};
