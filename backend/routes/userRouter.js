const express = require("express");
const authController = require("./../controller/authController");
const userController = require("./../controller/userController");
const router = express.Router();

router.post("/signin", authController.signIn);
router.post("/login", authController.logIn);
router.get("/isLoggedIn", authController.isLoggedIn);
router.get("/logout", authController.logout);
router.post("/forgetpassword", authController.forgetPassword);
router.patch("/resetpassword/:token", authController.resetPassword);
router.patch("/updateMe", authController.protect, userController.userMe);
router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

router.use(authController.protect);
router.use(authController.restictTo("admin"));
router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .delete(userController.deleteUser)
  .patch(userController.userMe)
  .get(userController.getUser);

module.exports = router;
