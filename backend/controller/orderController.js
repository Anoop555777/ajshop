const Order = require("./../model/orderModel");
const catchAsync = require("./../utils/catchAsyn");
const AppError = require("./../utils/appError");

exports.createOrder = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  const order = await Order.create(req.body);
  if (!order)
    return next(
      new AppError(404, "can't able to create the product please try again.")
    );

  res.status(201).json({ status: "success", data: { order } });
});
