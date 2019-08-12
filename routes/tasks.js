const express = require("express");
const router = express.Router();
const passport = require("passport");

const taskCtrl = require("../controllers/tasksController");

// const userCtrl = require("../controllers/usersController");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  taskCtrl.getUserTasks
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  taskCtrl.createTask
);

module.exports = router;
