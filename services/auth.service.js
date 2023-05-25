const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config");
const AuthError = require("../exceptions/auth.error");
var pool = require('../config/db.config');

async function loginUser(login, loginType, pswHash) {
  return pool
    .query("call sp_login_user(?, ?, ?)", [login, loginType, pswHash])
    .then((result) => {
      console.log(result[0][0][0]);
      return result[0][0][0];
    })
    .catch((err) => {
      //   if (err instanceof AuthError)
      throw AuthError.BadRequest(err);
    });
}

async function registerUser(email, username, paswHash) {
  return pool
    .query("call sp_register_user(?, ?, ?)", [email, username, paswHash])
    .then((result) => {
      console.log(result[0]);
      return result[0][0][0];
    })
    .catch((err) => {
      //   if (err instanceof AuthError)
      throw AuthError.BadRequest(err);
    });
}

module.exports = {
  loginUser,
  registerUser,
};
