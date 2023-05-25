const BidsError = require("../exceptions/bids.error");
const bidsService = require("../services/bids.service");
const path = require("path");
const fs = require("fs");

async function getWinnerEmail(req, res, next) {
  try {
    const { itemId } = req.params;
    res.json(await bidsService.getWinnerEmail(itemId));
  } catch (err) {
    console.error(`Error bids controller: `, err.message);
    next(err);
  }
}

async function placeBid(req, res, next) {
  try {
    const { item_id, person_id, time_bid, price } = req.body;
    res.json(await bidsService.placeBid(item_id, person_id, price));
  } catch (err) {
    console.error(`Error bids controller: `, err.message);
    next(err);
  }
}

async function getBidsUser(req, res, next) {
  try {
    const { userId } = req.params;
    res.json(await bidsService.getBidsUser(userId));
  } catch (err) {
    console.error(`Error bids controller: `, err.message);
    next(err);
  }
}

async function getBidsItem(req, res, next) {
  try {
    const { itemId } = req.params;
    res.json(await bidsService.getBidsItem(itemId));
  } catch (err) {
    console.error(`Error bids controller: `, err.message);
    next(err);
  }
}
async function getBidPhoto(req, res, next) {
  try {
    const { itemId } = req.params;
    // res.send(await bidsService.getBidPhoto(itemId));

    const photoDir = path.join(__dirname, "../image/photo");
    const fileName = await bidsService.getBidPhoto(itemId); // remove leading '/'
    const filePath = path.join(photoDir, fileName);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
      return;
    }

    next();
  } catch (err) {
    console.error(`Error bids controller: `, err.message);
    next(err);
  }
}

module.exports = {
  placeBid,
  getBidsUser,
  getBidsItem,
  getWinnerEmail,
  getBidPhoto,
};
