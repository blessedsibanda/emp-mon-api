const { Employee } = require("../models/Employee");
const User = require("../models/User");

const createEmployee = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const emp = await Employee.create({ user });
    return res.status(201).json({
      message: "Employee create successfully",
      employee: emp
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employeesIds = await Employee.find({}, "user");
    const employees = [];
    const rslt = employeesIds.forEach(async id => {
      let user = await User.findById(id);
      employees.push(user);
    });
    return res.json(employees);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message
    });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees
};
