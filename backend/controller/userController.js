const catchAsync = require("./../utils/catchAsyn");
const AppError = require("./../utils/appError");
const User = require("./../model/userModel");

function filterObj(obj, ...fields) {
  const returnObj = {};
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) returnObj[el] = obj[el];
  });
  return returnObj;
}

exports.userMe = catchAsync(async (req, res, next) => {
  //check if body have a password field
  if (req.body.password || req.body.ConfirmPassword)
    return next(
      new AppError(
        400,
        "this is not the route to update password use updatePassword route"
      )
    );

  //filter field names
  let updateUser;
  if (req.success) {
    updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        role: req.body.role,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    const filterBody = filterObj(req.body, "name", "email");
    updateUser = await User.findByIdAndUpdate(req.user._id, filterBody, {
      new: true,
      runValidators: true,
    });
  }

  res.status(200).json({
    status: "success",
    user: {
      name: updateUser.name,
      email: updateUser.email,
      role: updateUser.role,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  let query = User.find().select("+role");
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 8;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  const noOfProduct = await User.countDocuments();
  if (req.query.page) {
    if (skip >= noOfProduct)
      return next(new AppError(404, "This page does not exist."));
  }

  const users = await query;

  if (users.length === 0) {
    return next(new AppError(404, "no user found "));
  }

  res
    .status(200)
    .json({ status: "success", data: users, pages: noOfProduct / limit });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(204).json({ status: "success", data: null });
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id).select("+role");
  if (!user) return next(new AppError(404, "User not found"));
  res.status(200).json({ status: "success", data: user });
});
