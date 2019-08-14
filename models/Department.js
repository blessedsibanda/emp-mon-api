const mongoose = require("mongoose");
const { empSchema } = require("./Employee");

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
    employees: [empSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", dptSchema);
