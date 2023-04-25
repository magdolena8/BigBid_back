const AuthError = require("../exceptions/auth.error");

module.exports = function (err, req, res, next) {
  console.log(err);
  if (err instanceof AuthError) {
    return res
      .staus(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(err.status).json("{ message: err.message }");
};
