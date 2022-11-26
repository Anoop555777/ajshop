const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsyn");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");

const tokenGenerater = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const sendToken = (user, statusCode, res) => {
  const token = tokenGenerater(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({ status: "success", token });
};

exports.signIn = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  sendToken(user, 201, res);
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if user have enter email and password

  if (!email || !password)
    next(new AppError(401, "please enter email and password"));

  //check if the user exist and password is correct

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError(401, "please correct your email and password"));

  sendToken(user, 200, res);
});
