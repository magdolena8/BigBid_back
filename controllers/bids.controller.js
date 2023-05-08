const BidsError = require("../exceptions/bids.error");
const bidsService = require("../services/bids.service");

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

module.exports = {
  placeBid,
  getBidsUser,
};
