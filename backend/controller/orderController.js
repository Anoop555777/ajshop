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

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new AppError(404, "dont have a order of this id"));

  res.status(200).json({ status: "success", data: { order } });
});
