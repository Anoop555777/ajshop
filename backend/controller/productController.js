const Product = require("./../model/productModel");
const path = require("path");
const catchAsync = require("./../utils/catchAsyn");
const AppError = require("./../utils/appError");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductPhoto = upload.single("image");

exports.resizeProductPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `photo-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(
      path.join(path.resolve(), `frontend/build/images/${req.file.filename}`)
    );

  next();
});

exports.getAllProduct = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.query.keyword) {
    filter.name = { $regex: req.query.keyword, $options: "i" };
  }
  let query = Product.find(filter);

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 8;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  const noOfProduct = await Product.countDocuments();
  if (req.query.page) {
    if (skip >= noOfProduct)
      return next(new AppError(404, "This page does not exist."));
  }

  const products = await query;

  if (products.length === 0) {
    return next(new AppError(404, "no products found "));
  }
  res.status(200).json({
    status: "success",
    products,
    pages: Math.ceil(noOfProduct / limit),
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const product = await Product.findById(id).populate("reviews");

  if (!product) {
    return next(new AppError(404, "no product found "));
  }
  res.status(200).json({ status: "success", product });
});

exports.createProduct = catchAsync(async (req, res) => {
  if (req.file) req.body.image = `/images/${req.file.filename}`;
  if (req.body.price) req.body.price = +req.body.price;
  if (req.body.countInStock) req.body.countInStock = +req.body.countInStock;
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  if (!product)
    return next(
      new AppError(404, "can't able to create the product please try again.")
    );

  res.status(201).json({ status: "success", data: { product } });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product)
    return next(
      new AppError(404, "can't able to delete the product please try again.")
    );

  res.status(204).json({ status: "success", data: null });
});

exports.updateProductQty = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError(404, "Product not found"));
  }
  if (product.countInStock === 0)
    return next(new AppError(404, "out of stock"));

  product.countInStock = product.countInStock - req.body.qty;

  await product.save();

  res.status(200).json({ status: "success" });
});

exports.updateProduct = catchAsync(async (req, res) => {
  if (req.file) req.body.image = `/images/${req.file.filename}`;
  if (req.body.price) req.body.price = +req.body.price;
  if (req.body.countInStock) req.body.countInStock = +req.body.countInStock;

  const product = await Product.findByIdAndUpdate(req.params.id, req.body);

  if (!product) {
    return next(new AppError(404, "Product not found"));
  }

  res.status(200).json({ status: "success" });
});

exports.topRatedProduct = catchAsync(async (req, res) => {
  const products = await Product.find().sort({ rating: -1 }).limit(5);
  if (products.length === 0)
    return next(new AppError(404, "Products not found"));

  res.status(200).json({ status: "success", products });
});
