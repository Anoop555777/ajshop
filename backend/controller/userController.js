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

  const filterBody = filterObj(req.body, "name", "email");
  const updateUser = await User.findByIdAndUpdate(req.user._id, filterBody, {
    new: true,
    runValidators: true,
  });

  res
    .status(200)
    .json({
      status: "success",
      user: { name: updateUser.name, email: updateUser.email },
    });
});
