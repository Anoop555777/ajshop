const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
router.route("/").get(productController.getAllProduct);
router.route("/:id").get(productController.getProduct);
module.exports = router;
