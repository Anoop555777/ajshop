const express = require("express");
const router = express.Router();
const authController = require("./../controller/authController");
const productController = require("../controller/productController");

const reviewRouter = require("./../routes/reviewRouter");

router.use("/:productId/reviews", reviewRouter);

router.get("/toprated", productController.topRatedProduct);

router
  .route("/")
  .get(productController.getAllProduct)
  .post(
    authController.protect,
    authController.restictTo("admin"),
    productController.uploadProductPhoto,
    productController.resizeProductPhoto,
    productController.createProduct
  );

router
  .route("/:id")
  .get(productController.getProduct)
  .delete(
    authController.protect,
    authController.restictTo("admin"),
    productController.deleteProduct
  )
  .patch(
    authController.protect,
    authController.restictTo("admin"),
    productController.uploadProductPhoto,
    productController.resizeProductPhoto,
    productController.updateProduct
  );

router
  .route("/updateQty/:id")
  .patch(authController.protect, productController.updateProductQty);

module.exports = router;
