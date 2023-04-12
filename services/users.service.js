const mysql = require("mysql2");
const dbConfig = require("../config/db.config");

async function getUserList() {
  const pool = mysql.createPool(dbConfig);
  pool.query("select * from person", function (err, data) {
    if (err) return console.log(err);
    return data;
  });
}

module.exports = {
  getUserList,
};

// pool.query("select * from person", function (err, data) {
//   if (err) return console.log(err);
//   console.log(data);
// });
