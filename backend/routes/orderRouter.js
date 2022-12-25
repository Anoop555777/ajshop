const authController = require("./../controller/authController");
const orderController = require("./../controller/orderController");
const express = require("express");

const router = express.Router();

router.route("/").post(authController.protect, orderController.createOrder);
module.exports = router;
