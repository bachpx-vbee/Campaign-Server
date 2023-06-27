const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    campaignId: String,
    userId: String,
    roleId: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Member", userSchema);
