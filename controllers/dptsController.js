const Department = require("../models/Department");


const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find({})  
    return res.json(departments);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message
    }); 
  }
  
};

const createDepartment = async (req, res) => {
  try {
    const newDpt = await Department.create(req.body)
    return res.status(201).json({
      message: "Department created successfully!",
      department: newDpt
    })
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message
    });
  }
};

module.exports = {
  getAllDepartments,
  createDepartment,
};
