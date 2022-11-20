const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name required"],
  },
  image: {
    type: String,
    required: [true, "product image required"],
  },
  brand: {
    type: String,
    required: [true, "product brand required"],
  },
  category: {
    type: String,
    required: [true, "product category required"],
  },
  description: {
    type: String,
    required: [true, "product description required"],
  },

  rating: {
    type: Number,
    required: [true, "product name required"],
    default: 0,
    max: 5,
    min: 0,
  },
  numReviews: {
    type: Number,
    required: [true, "product name required"],
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "product name required"],
    default: 0,
  },
  countInStock: {
    type: Number,
    required: [true, "product name required"],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
