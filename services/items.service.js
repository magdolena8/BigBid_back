const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config");
const pageCalculator = require("../utils/page.calculator");
const ApiError = require("../exceptions/api.error");
var pool = require("../config/db.config");

async function getOwnerItems(ownerId, pageNumber) {
  const [limit, offset] = pageCalculator(pageNumber, process.env.PAGE_SIZE);
  console.log([limit, offset]);
  const [resultSet] = await pool.query("call sp_get_owner_items(?)", [ownerId]);
  console.log(resultSet[0]);
  return resultSet[0];
}
async function getAllItems(filter) {
  console.log(filter);
  const [resultSet] = await pool.query("call sp_get_all_items(?)", [filter]);
  return resultSet[0];
}

async function createLot(
  userId,
  title,
  category,
  decription,
  startPrice,
  aucDuration,
  imageName
) {
  return pool
    .query("call sp_create_lot(?, ?, ?, ?, ?, ?, ?)", [
      userId,
      title,
      category,
      decription,
      startPrice,
      aucDuration,
      imageName,
    ])
    .then((result) => {
      console.log(result[0][0]);
      return result[0][0];
    })
    .catch((err) => {
      throw ApiError.BadRequest(err);
    });
}

async function getLikedItems(userId) {
  const [resultSet] = await pool.query("call sp_get_liked_items(?)", [userId]);
  console.log(resultSet[0]);
  return resultSet[0];
}

async function likeItem(itemId, userId) {
  const [resultSet] = await pool.query("call sp_add_favourite(?, ?, ?)", [
    itemId,
    userId,
    "liked",
  ]);
  console.log(resultSet.affectedRows == 1);
  return resultSet.affectedRows == 1;
}

async function unlikeItem(itemId, userId) {
  const [resultSet] = await pool.query("call sp_unlike_item(?, ?)", [
    itemId,
    userId,
  ]);
  console.log(resultSet.affectedRows == 1);
  return resultSet.affectedRows == 1;
}

async function getUserCatalogItems(userId, filter) {
  // const [limit, offset] = pageCalculator(pageNumber, process.env.PAGE_SIZE);
  console.log(filter);
  const [resultSet] = await pool.query("call sp_get_user_catalog(?, ?)", [
    userId,
    filter,
  ]);
  return resultSet[0];
}

async function getItemById(itemId) {
  return pool
    .query("call sp_get_item(?)", [itemId])
    .then((result) => {
      console.log(result[0][0][0]);
      return result[0][0][0];
    })
    .catch((err) => {
      throw ApiError.BadRequest(err);
    });
}

async function deleteItem(itemId) {
  return pool
    .query("call sp_delete_item(?)", [itemId])
    .then((result) => {
      console.log(result[0].affectedRows);
      return result[0].affectedRows == 1;
    })
    .catch((err) => {
      throw ApiError.BadRequest(err);
    });
}

async function editItem(itemId, newTitle, newDescription, newCategory) {
  return pool
    .query("call sp_edit_item(?,?,?,?)", [
      itemId,
      newTitle,
      newDescription,
      newCategory,
    ])
    .then((result) => {
      console.log(result[0].affectedRows);
      return result[0].affectedRows == 1;
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
  createLot,
  getAllItems,
  deleteItem,
  editItem,
};
