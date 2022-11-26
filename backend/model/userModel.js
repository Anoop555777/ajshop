const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidateKey,
  userPassword
) {
  return await bcrypt.compare(candidateKey, userPassword);
};

userSchema.methods.changePasswordAfter = function () {};

const User = mongoose.model("User", userSchema);

module.exports = User;
