const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/usersController");

/* GET users listing. */
router.get("/", userCtrl.getAllUsers);

module.exports = router;
