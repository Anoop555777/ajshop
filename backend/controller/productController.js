const products = require("./../data/products");
exports.getAllProduct = (req, res, next) => {
  res.status(200).json({ status: "success", products });
};
exports.getProduct = (req, res, next) => {
  const product = products.find((product) => product._id === req.params.id);

  res.status(200).json({ status: "success", product });
};
