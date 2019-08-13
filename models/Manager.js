const mongoose = require("mongoose");
const { employeeSchema } = require("./Employee");

const managerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      unique: true // one manager per department
    },
    employees: [employeeSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Manager", managerSchema);
