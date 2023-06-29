const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    method: String,
    url: String,
    type: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Permission", userSchema);
