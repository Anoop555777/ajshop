const Review = require("./../model/reviewModel");
const catchAsync = require("./../utils/catchAsyn");
const AppError = require("./../utils/appError");

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  const review = await Review.create(req.body);

  if (!review) next(new AppError(404, "sorry please try again"));

  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.params.productId) filter = { product: req.params.productId };

  const review = await Review.find(filter);

  if (!review) next(new AppError(404, "sorry please try again"));

  res.status(200).json({
    status: "success",
    result: review.length,
    data: {
      review,
    },
  });
});
