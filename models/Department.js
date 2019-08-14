const mongoose = require("mongoose");

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
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", dptSchema);
