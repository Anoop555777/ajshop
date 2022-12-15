const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsyn");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const util = require("util");

const tokenGenerater = function (id) {
  console.log(id);
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

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token) return next(new AppError(401, "please log in first"));

  //2 verification of the token

  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  //3 check is the user still exists
  const freshUser = await User.findById(decoded.id).select("+role");

  if (!freshUser)
    return next(
      new AppError(401, "Token belong to the user don't exist anymore")
    );

  //4 check if the user have changed the password after login

  if (freshUser.changePasswordAfter(decoded.iat))
    return next(
      new AppError(
        401,
        "user have change the password after login please log in again"
      )
    );

  //next will grant excess to private routes
  req.user = freshUser;

  next();
});

exports.restictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(403, "You are forbidden to do operation in this doc")
      );
    }
    next();
  };
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  //find the user with the help of email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError(400, "no email found "));

  // generate a ramdon route token
  const resetToken = user.createPasswordResetToken();
});
