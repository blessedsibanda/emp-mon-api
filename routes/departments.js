const express = require("express");
const router = express.Router();

const dptCtrl = require("../controllers/dptsController");

router.get("/", dptCtrl.getAllDepartments);
router.post("/", dptCtrl.createDepartment);
// router.put("/:dptId", dptCtrl.addEmployeeToDepartment);

module.exports = router;
