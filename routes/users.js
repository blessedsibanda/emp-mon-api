const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/usersController");

router.get("/", userCtrl.getAllUsers);
router.post("/", userCtrl.createUser);

module.exports = router;
