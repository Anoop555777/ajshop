const express = require("express");
const authController = require("./../controller/authController");
const reviewController = require("./../controller/reviewController");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    authController.protect,
    authController.restictTo("user"),
    reviewController.createReview
  )
  .get(authController.protect, reviewController.getAllReviews);

module.exports = router;
