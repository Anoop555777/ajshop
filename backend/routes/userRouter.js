const express = require("express");
const authController = require("./../controller/authController");
const router = express.Router();
router.post("/signin", authController.signIn);

module.exports = router;
