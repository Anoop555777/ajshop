import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "field must have user"],
    ref: "User",
  },
  orderItems: [
    {
      name: { type: String, required: [true, "field must have name"] },
      qty: { type: Number, required: [true, "field must have qty"] },
      image: { type: String, required: [true, "field must have image"] },
      price: { type: Number, required: [true, "field must have price"] },
      product: {
        type: mongoose.Schema.ObjectId,
        required: [true, "field must have product"],
        ref: "Product",
      },
    },
  ],
  shippingAddress: {
    address: { type: String, required: [true, "field must have address"] },
    city: { type: String, required: [true, "field must have city"] },
    postalCode: {
      type: String,
      required: [true, "field must have postalCode"],
    },
    country: { type: String, required: [true, "field must have country"] },
  },
  paymentMethod: {
    type: String,
    required: [true, "field must have paymentMethod"],
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  taxPrice: {
    type: Number,
    required: [true, "field must have taxprice"],
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: [true, "field must have shippingPrice"],
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: [true, "field must have totalPrice"],
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    required: [true, "field must have isPaid"],
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    required: [true, "field must have isDelivered"],
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
