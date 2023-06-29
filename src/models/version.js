const { kStringMaxLength } = require("buffer");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    campaignId: String,
    title: String,
    content: String,
    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Version", userSchema);
