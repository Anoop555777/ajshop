const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsyn");
exports.signIn = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({ status: "success", user });
});
