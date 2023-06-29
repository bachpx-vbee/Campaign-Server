const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    status: {
      type: String,
      default: "done",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Campaign", userSchema);
