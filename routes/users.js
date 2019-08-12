const express = require("express");
const router = express.Router();
const passport = require("passport");

const userCtrl = require("../controllers/usersController");

router.get("/", userCtrl.getAllUsers);
router.post("/", userCtrl.createUser);
router.post("/login", userCtrl.getUserToken);
router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  userCtrl.viewDashboard
);

module.exports = router;
