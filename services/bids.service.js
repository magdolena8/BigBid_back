const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config");
const BidsError = require("../exceptions/bids.error");
var pool = require('../config/db.config');

async function placeBid(itemId, personId, bidSize) {
  return pool
    .query("call sp_place_bid(?, ?, ?)", [itemId, personId, bidSize])
    .then((result) => {
      console.log(result[0][0][0]);
      return result[0][0][0];
    })
    .catch((err) => {
      //   if (err instanceof AuthError)
      throw BidsError.BadRequest(err);
    });
}
async function getBidPhoto(itemId) {
  return pool
    .query("call sp_get_bid_photo(?)", [itemId])
    .then((result) => {
      console.log(result[0][0][0].link);
      // res.send(__dirname + "/image/photo/" + result[0][0][0].link)
      return result[0][0][0].link;
    })
    .catch((err) => {
      //   if (err instanceof AuthError)
      throw BidsError.BadRequest(err);
    });
}
async function getWinnerEmail(itemId) {
  return pool
    .query("call sp_get_winner_email(?)", [itemId])
    .then((result) => {
      console.log(result[0][0][0]);
      return result[0][0][0].email;
    })
    .catch((err) => {
      //   if (err instanceof AuthError)
      throw BidsError.BadRequest(err);
    });
}

async function getBidsUser(userId) {
  return pool
    .query("call sp_get_bids_user(?)", [userId])
    .then((result) => {
      console.log(result[0][0]);
      return result[0][0];
    })
    .catch((err) => {
      throw BidsError.BadRequest(err);
    });
}

async function getBidsItem(itemId) {
  return pool
    .query("call sp_get_bids_item(?)", [itemId])
    .then((result) => {
      console.log(result[0][0]);
      return result[0][0];
    })
    .catch((err) => {
      throw BidsError.BadRequest(err);
    });
}

module.exports = {
  placeBid,
  getBidsUser,
  getBidsItem,
  getWinnerEmail,
  getBidPhoto,
};
