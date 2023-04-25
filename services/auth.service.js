const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config");
const AuthError = require("../exceptions/auth.error");
// const ApiError = require("../exceptions/api.error");

async function loginUser(login, loginType, pswHash) {
  const pool = mysql.createPool(dbConfig);
  //   const [resultSet] = await pool
  //     .query("call sp_login_user(?, ?, ?)", [login, loginType, pswHash])
  //     .catch((err) => {
  //       return err.message;
  //     });
  //   //   console.log(resultSet[0][0]);
  //   return resultSet[0][0];
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
  const pool = mysql.createPool(dbConfig);
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
