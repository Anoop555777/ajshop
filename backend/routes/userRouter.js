const express = require("express");
const authController = require("./../controller/authController");
const router = express.Router();

router.post("/signin", authController.signIn);
router.post("/login", authController.logIn);
router.get("/isLoggedIn", authController.isLoggedIn);

module.exports = router;
