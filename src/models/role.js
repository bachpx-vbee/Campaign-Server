const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    permission: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Role", userSchema);
