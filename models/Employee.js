const mongoose = require("mongoose");

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
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

module.exports = mongoose.model("Employee", empSchema);
