const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

router.get("/", usersController.get);
router.get("/favourite/:userId", usersController.get);
router.post("/update/:username", usersController.editUser);

module.exports = router;
