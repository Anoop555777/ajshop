const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "please tell us your email"],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "you must hava password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please type your password again"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords must be same",
    },
  },
  passwordChangeAt: Date,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    select: false,
  },
  passwordResetToken: String,
  passwordExprireToken: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
