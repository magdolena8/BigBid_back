const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");

router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
// router.get("/", itemsController.getOwnerItemsTest); //test for Android connection

module.exports = router;