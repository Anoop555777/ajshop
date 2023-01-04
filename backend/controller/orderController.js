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
          images: [`${req.protocol}://${req.get("host")}${el.image}`],
        },
      },
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    success_url: `http://127.0.0.1:3000/orders/${req.params.orderId}`,
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
