const express = require("express");
const router = express.Router();
const bidsController = require("../controllers/bids.controller.js");

router.post("/:itemId", bidsController.placeBid);
router.get("/user/:userId", bidsController.getBidsUser);
router.get("/item/:itemId", bidsController.getBidsItem);
router.get("/winner/:itemId", bidsController.getWinnerEmail);
router.get("/photo/:itemId", bidsController.getBidPhoto);

module.exports = router;
