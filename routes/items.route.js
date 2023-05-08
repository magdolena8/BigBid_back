const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items.controller");

// router.get("/", itemsController.getOwnerItemsTest); //test for Android connection
router.get("/:itemId", itemsController.getItemById);
router.get("/catalog/:userId", itemsController.getUserCatalog);
router.get("/user/:userId", itemsController.getOwnerItems);
router.get("/liked/:userId", itemsController.getLikedItems);
router.post("/liked/:userId", itemsController.likeItem);
router.delete("/liked/:userId", itemsController.unlikeItem);

module.exports = router;
