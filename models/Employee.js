const mongoose = require("mongoose");
const Department = require("./Department");

const empSchema = mongoose.Schema(
  {
    isManager: {
      type: Boolean,
      default: false
    },
    // isActive -- whether the employee has registered their account
    isActive: {
      type: Boolean,
      default: false
    },
    jobTitle: {
      type: String,
      required: true
    },
    designationNumber: {
      type: Number,
      required: true,
      unique: true
    },
    department: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

empSchema.virtual("departmentName").get(async function() {
  const dpt = await Department.findById(this.department);
  return dpt;
});

module.exports = mongoose.model("Employee", empSchema);
