const Employee = require("../models/Employee");
const Department = require("../models/Department");

const createEmployee = async (req, res) => {
  try {
    const {
      department,
      isManager,
      jobTitle,
      designationNumber,
      firstName,
      middleName,
      lastName
    } = req.body;
    const dpt = await Department.findOne({ name: department });
    if (!dpt) {
      return res.status(400).json({
        error: true,
        message: "Provide a valid department name"
      });
    }
    const emp = await Employee.create({
      isManager,
      jobTitle,
      designationNumber,
      department,
      firstName,
      middleName,
      lastName
    });
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
    const employees = await Employee.find({});
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
