const express = require("express");
const router = express.Router();

const empCtrl = require("../controllers/empsController");

router.get("/", empCtrl.getAllEmployees);
router.post("/", empCtrl.createEmployee);

module.exports = router;
