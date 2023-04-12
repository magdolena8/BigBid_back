const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config");
const pageCalculator = require("../utils/page.calculator");

async function getOwnerItems(ownerId, pageNumber) {
  console.log([ownerId, pageNumber]);
  const pool = mysql.createPool(dbConfig);
  const [limit, offset] = pageCalculator(pageNumber, process.env.PAGE_SIZE);
  console.log([limit, offset]);
  const [resultSet] = await pool.query("call sp_get_owner_items(?, ?, ?)", [
    ownerId,
    limit,
    offset,
  ]);
  console.log(resultSet[0]);
  return resultSet[0];
}

async function getItemOnMarket(userId, pageNumber) {
  const pool = mysql.createPool(dbConfig);
  const [limit, offset] = pageCalculator(pageNumber, process.env.PAGE_SIZE);
  const [resultSet] = await pool.query("call sp_get_items_on_market(?, ?, ?)", [
    userId,
    limit,
    offset,
  ]);
  return resultSet[0];
}

module.exports = {
  getOwnerItems,
  getItemOnMarket,
};
