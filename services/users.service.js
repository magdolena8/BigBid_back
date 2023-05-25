const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config");
const res = require("express/lib/response");
const ApiError = require("../exceptions/api.error");
var pool = require("../config/db.config");

async function getUserList() {
  pool.query("select * from person", function (err, data) {
    if (err) return console.log(err);
    return data;
  });
}

async function editUser(userId, newImageName) {
  return pool
    .query("call sp_edit_user(?, ?)", [userId, newImageName])
    .then((result) => {
      console.log(result[0][0]);
      return result[0][0];
    })
    .catch((err) => {
      throw ApiError.BadRequest(err);
    });
}

module.exports = {
  getUserList,
  editUser,
};
