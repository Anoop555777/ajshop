const authController = require("./../controller/authController");
const orderController = require("./../controller/orderController");
const express = require("express");

const router = express.Router();

router.route("/").post(authController.protect, orderController.createOrder);
router.route("/:id").get(authController.protect, orderController.getOrder);
router
  .route("/:id/paid")
  .patch(authController.protect, orderController.updateOrderToPaid);

router.get(
  "/myorders",
  authController.protect,
  orderController.getAllOrderByUser
);

router.get(
  "/checkout-session/:orderId",
  authController.protect,
  orderController.getCheckoutSession
);
module.exports = router;
