const Order = require("./../model/orderModel");
const catchAsync = require("./../utils/catchAsyn");
const AppError = require("./../utils/appError");
const Stripe = require("stripe");

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

exports.updateOrderToPaid = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new AppError(404, "dont have a order of this id"));
  order.isPaid = true;
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.user._id,
  };
  const updateOrder = await order.save();

  res.status(200).json({ status: "success", data: { updateOrder } });
});

exports.getCheckoutSession = catchAsync(async (req, res) => {
  //1) get the order details
  const order = await Order.findById(req.params.orderId);
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    success_url: `${req.protocol}://${req.get("host")}/orders/${
      req.params.orderId
    }`,
    cancel_url: `${req.protocol}://${req.get("host")}/`,
    customer_email: req.user.email,
    client_reference_id: req.params.orderId,
    line_items: [
      {
        price: order.totalPrice,
      },
    ],
  });

  //create a session as response

  res.status(200).json({
    status: "success",
    session,
  });
});
