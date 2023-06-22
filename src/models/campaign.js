const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    status: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Campaign", userSchema);
