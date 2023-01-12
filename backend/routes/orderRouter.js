const authController = require("./../controller/authController");
const orderController = require("./../controller/orderController");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .post(authController.protect, orderController.createOrder)
  .get(
    authController.protect,
    authController.restictTo("admin"),
    orderController.getAllOrders
  );
router
  .route("/myorders")
  .get(authController.protect, orderController.getAllOrderByUser);

router.route("/:id").get(authController.protect, orderController.getOrder);
router
  .route("/:id/paid")
  .patch(authController.protect, orderController.updateOrderToPaid);

router.get(
  "/checkout-session/:orderId",
  authController.protect,
  orderController.getCheckoutSession
);

router.patch(
  "/:id/deliver",
  authController.protect,
  authController.restictTo("admin"),
  orderController.orderToDeliver
);

module.exports = router;
