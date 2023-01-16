const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsyn");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const util = require("util");
const Email = require("./../utils/email");
const crypto = require("crypto");

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
  res.locals.user = user;

  res.status(statusCode).json({
    status: "success",
    token,
    user: { name: user.name, email: user.email, role: user.role },
  });
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

  const user = await User.findOne({ email }).select("+password +role");

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
  else if (req.cookies.jwt) token = req.cookies.jwt;

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

  if (freshUser.changedPasswordAfter(decoded.iat))
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

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token

      const decoded = await util.promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id).select("+role");

      if (!currentUser) {
        return next();
      }
      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN U

      res.status(200).json({
        status: "success",
        user: {
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role,
        },
      });
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.restictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(403, "You are forbidden to do operation in this doc")
      );
    }

    req.success = true;
    next();
  };
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  //find the user with the help of email
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError(400, "no email found "));

  // generate a ramdon route token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //send it to user's email

  const resetURL = `${req.protocol}://127.0.0.1:3000/resetpassword?reset_token=${resetToken}`;

  try {
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.logout = (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10),
    httpOnly: true,
  });

  res
    .status(200)
    .json({ status: "success", user: { name: null, email: null, role: null } });
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  //get user from the protected middleware
  const user = await User.findById(req.user._id).select("password");

  //only if user password if correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password)))
    return next(new AppError(401, "enter correct password"));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();
  const userUpdateInfo = await User.findById(user._id);

  sendToken(userUpdateInfo, 200, res);
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordExpireToken: { $gt: Date.now() }, //checked if token is expired or not
  });

  if (!user) {
    return next(new AppError("Token in invlid or expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordExpireToken = undefined;
  await user.save();
  //update change passwordAt property

  //log the user in
  sendToken(user, 200, res);
});
