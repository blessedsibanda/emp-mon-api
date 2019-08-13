const mongoose = require("mongoose");

const empSchema = mongoose.Schema(
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
      required: true
    }
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", empSchema);

module.exports = {
  Employee,
  empSchema
};
