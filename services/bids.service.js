const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config");
const BidsError = require("../exceptions/bids.error");

async function placeBid(itemId, personId, bidSize) {
  const pool = mysql.createPool(dbConfig);
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

async function getBidsUser(userId) {
  const pool = mysql.createPool(dbConfig);
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

module.exports = {
  placeBid,
  getBidsUser,
};
