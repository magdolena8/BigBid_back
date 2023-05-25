const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config");
const pageCalculator = require("../utils/page.calculator");
var pool = require('../config/db.config');

async function getMarketItems(userId, filters, pageNumber) {
  const [limit, offset] = pageCalculator(pageNumber, process.env.PAGE_SIZE);
  const { whereStr, orderStr } = filters;
  const [resultSet] = await pool.query(
    "call sp_get_items_on_market(?, ?, ?, ?,?)",
    [userId, whereStr, orderStr, limit, offset]
  );
  return resultSet[0];
}

module.exports = {
  getMarketItems,
};
