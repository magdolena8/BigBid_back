const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items.controller");

router.get("/:userId/", itemsController.getOwnerItems);
router.get("/", itemsController.getOwnerItemsTest); //test for Android connection

module.exports = router;
