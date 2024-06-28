const mongoose = require("mongoose");
const crypto = require("crypto");
const { type } = require("os");
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", required: true },
    phone: { type: Number },
    address: { type: String },
    gender: { type: String },
    imageUser: { type: String },
    status: { type: String, default: "active", required: true },

    refreshToken: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods = {
  createPasswordChangedToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
  },
};

const User = mongoose.model("User", userSchema);
module.exports = User;
