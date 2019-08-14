const Department = require("../models/Department");
const { Employee } = require("../models/Employee");

const getAllDepartments = (req, res) => {
  Department.find({})
    .then(departments => {
      return res.json(departments);
    })
    .catch(err => {
      return res.status(500).json({
        error: true,
        message: err.message
      });
    });
};

const createDepartment = (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({
      error: true,
      message: "Provide the name and the short description of the department"
    });
  }
  Department.create({ name, description })
    .then(dpt =>
      res.status(201).json({
        message: "Department created successfully!",
        department: dpt
      })
    )
    .catch(err => {
      return res.status(500).json({
        error: true,
        message: err.message
      });
    });
};

const addEmployeeToDepartment = async (req, res) => {
  const dptId = req.params.dptId;
  try {
    const dpt = await Department.findById(dptId);
    const { empId } = req.body;
    if (!empId) {
      return res.status(400).json({
        error: true,
        message: "Please provide the employee id"
      });
    }
    const employee = await Employee.findById(empId);
    employee.department = dpt._id;
    dpt.employees.push(employee);
    await employee.save();
    await dpt.save();
    return res.json(201).json({
      message: "Employee added to department successfully",
      department: dpt
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.message
    });
  }

  // Department.findById(dptId)
  //   .then(dpt => {
  //     if (dpt) {
  //       // create a new employee
  //       const newEmp = new Employee({
  //         user: req.body.user,
  //         department: dpt._id
  //       });
  //       newEmp.save().then(emp => {
  //         dpt.employees.push(emp);
  //         dpt.save().then(department => {
  //           return res.json(201).json({
  //             message: "Employee added to department successfully",
  //             ...department
  //           });
  //         });
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     return res.status(500).json({
  //       error: true,
  //       message: err.message
  //     });
  //   });
};

module.exports = {
  getAllDepartments,
  createDepartment,
  addEmployeeToDepartment
};
