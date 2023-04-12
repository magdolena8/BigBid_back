const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items.controller");

router.get("/:userId/", itemsController.getOwnerItems);

module.exports = router;
