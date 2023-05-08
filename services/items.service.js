const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config");
const pageCalculator = require("../utils/page.calculator");
const ApiError = require("../exceptions/api.error");

async function getOwnerItems(ownerId, pageNumber) {
  console.log({ ownerId, pageNumber });
  const pool = mysql.createPool(dbConfig);
  const [limit, offset] = pageCalculator(pageNumber, process.env.PAGE_SIZE);
  console.log([limit, offset]);
  const [resultSet] = await pool.query("call sp_get_owner_items(?)", [ownerId]);
  console.log(resultSet[0]);
  return resultSet[0];
}

async function getLikedItems(userId) {
  const pool = mysql.createPool(dbConfig);
  // console.log([limit, offset]);
  const [resultSet] = await pool.query("call sp_get_liked_items(?)", [userId]);
  console.log(resultSet[0]);
  return resultSet[0];
}

async function likeItem(itemId, userId) {
  const pool = mysql.createPool(dbConfig);
  const [resultSet] = await pool.query("call sp_add_favourite(?, ?, ?)", [
    itemId,
    userId,
    "liked",
  ]);
  console.log(resultSet.affectedRows == 1);
  return resultSet.affectedRows == 1;
}

async function unlikeItem(itemId, userId) {
  const pool = mysql.createPool(dbConfig);
  const [resultSet] = await pool.query("call sp_unlike_item(?, ?)", [
    itemId,
    userId,
  ]);
  console.log(resultSet.affectedRows == 1);
  return resultSet.affectedRows == 1;
}

async function getUserCatalogItems(userId) {
  const pool = mysql.createPool(dbConfig);
  // const [limit, offset] = pageCalculator(pageNumber, process.env.PAGE_SIZE);
  const [resultSet] = await pool.query("call sp_get_user_catalog(?)", [userId]);
  return resultSet[0];
}

async function getItemById(itemId) {
  const pool = mysql.createPool(dbConfig);
  return pool
    .query("call sp_get_item(?)", [itemId])
    .then((result) => {
      console.log(result[0][0][0]);
      // let qwe = result[0][0][0]
      return result[0][0][0];
    })
    .catch((err) => {
      throw ApiError.BadRequest(err);
    });
}

module.exports = {
  getOwnerItems,
  getUserCatalogItems,
  getItemById,
  getLikedItems,
  likeItem,
  unlikeItem,
};
