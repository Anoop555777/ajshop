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
  const getorder = await Order.findById(req.params.id).populate("user");
  if (!getorder) return next(new AppError(404, "dont have a order of this id"));

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  if (!session)
    return next(new AppError(404, "dont have a key please pay again"));

  if (session.customer_email !== getorder.user.email)
    return next(new AppError(404, "something went wrong"));

  getorder.isPaid = true;
  getorder.paymentResult = {
    id: session.payment_intent,
    status: session.status,
    update_time: new Date(session.created * 1000),
    email_address: session.customer_email,
  };

  getorder.paidAt = session.created * 1000;
  const order = await getorder.save();

  res.status(200).json({ status: "success", data: { order } });
});

exports.getCheckoutSession = catchAsync(async (req, res) => {
  //1) get the order details
  const order = await Order.findById(req.params.orderId);

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const listItem = order.orderItems.map((el) => {
    return {
      quantity: el.qty,
      price_data: {
        currency: "inr",
        unit_amount:
          (el.price +
            order.taxPrice / (order.orderItems.length * el.qty) +
            order.shippingPrice / order.orderItems.length) *
          100,

        product_data: {
          description: el.name,
          name: el.name,
          images: [`https://ajshop.cyclic.app${el.image}`],
        },
      },
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    success_url: `${req.protocol}://${req.get("host")}/orders/${
      req.params.orderId
    }?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.protocol}://${req.get("host")}/`,
    customer_email: req.user.email,
    client_reference_id: req.params.orderId,
    line_items: listItem,
    mode: "payment",
  });

  //create a session as response

  res.status(200).json({
    status: "success",
    session,
  });
});

exports.getAllOrderByUser = catchAsync(async (req, res) => {
  const order = await Order.find({ user: req.user._id });

  if (!order)
    return next(new AppError(404, "sorry no order for this user Buy some!!!"));

  res
    .status(200)
    .json({ status: "success", result: order.length, data: { order } });
});

exports.getAllOrders = catchAsync(async (req, res) => {
  const order = await Order.find().populate({ path: "user", select: "name" });

  if (!order)
    return next(new AppError(404, "sorry no order for this user Buy some!!!"));

  res
    .status(200)
    .json({ status: "success", result: order.length, data: { order } });
});

exports.orderToDeliver = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order)
    return next(new AppError(404, "sorry no order for this user Buy some!!!"));

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({ status: "success" });
});
