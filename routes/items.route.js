const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items.controller");

// router.get("/", itemsController.getOwnerItemsTest); //test for Android connection
router.get("/catalog/all", itemsController.getAllItems);
router.get("/:itemId", itemsController.getItemById);
router.get("/catalog/:userId", itemsController.getUserCatalog);
router.get("/user/:userId", itemsController.getOwnerItems);
router.get("/liked/:userId", itemsController.getLikedItems);
router.post("/liked/:userId", itemsController.likeItem);
router.delete("/liked/:userId", itemsController.unlikeItem);
router.post("/:userId", itemsController.createLot);
router.delete("/:itemId", itemsController.deleteItem);
router.put("/:itemId", itemsController.editItem);

module.exports = router;
