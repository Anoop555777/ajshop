const Product = require("./../model/productModel");
const catchAsync = require("./../utils/catchAsyn");
const AppError = require("./../utils/appError");

exports.getAllProduct = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  if (!products) {
    return next(new AppError(404, "no products found "));
  }
  res.status(200).json({ status: "success", products });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  if (!product) {
    return next(new AppError(404, "no product found "));
  }
  res.status(200).json({ status: "success", product });
});
