const express = require("express");
const router = express.Router();
const marketController = require("../controllers/market.controller");

router.get("/", marketController.getMarketItems);

module.exports = router;
