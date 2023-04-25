const ApiError = require("../exceptions/api.error");
const authService = require("../services/auth.service");
// const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended: true }));

async function loginUser(req, res, next) {
  try {
    const { login, loginType, passwordHash } = req.body;
    console.log(req.body);
    res.json(await authService.loginUser(login, loginType, passwordHash));
  } catch (err) {
    console.error(`Error auth controller`, err.message);
    next(err);
  }
}

async function registerUser(req, res, next) {
  try {
    const { email, username, passwordHash } = req.body;
    console.log(req.body);
    res.json(await authService.registerUser(email, username, passwordHash));
  } catch (err) {
    console.error(`Error auth controller`, err.message);
    next(err);
  }
}

module.exports = {
  loginUser,
  registerUser,
};
