const mongoose = require("mongoose");
const { employeeSchema } = require("./Employee");

const dptSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    employees: [employeeSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", dptSchema);
