const express = require("express");
const router = express.Router();
const authController = require("./../controller/authController");
const productController = require("../controller/productController");
router
  .route("/")
  .get(productController.getAllProduct)
  .post(
    authController.protect,
    authController.restictTo("admin"),
    productController.createProduct
  );
router
  .route("/:id")
  .get(productController.getProduct)
  .delete(
    authController.protect,
    authController.restictTo("admin"),
    productController.deleteProduct
  );

router
  .route("/updateQty/:id")
  .patch(authController.protect, productController.updateProductQty);

module.exports = router;
