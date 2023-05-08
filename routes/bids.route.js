const express = require("express");
const router = express.Router();
const bidsController = require("../controllers/bids.controller.js");

router.post("/:itemId", bidsController.placeBid); 
router.get("/user/:userId", bidsController.getBidsUser); 


module.exports = router;
