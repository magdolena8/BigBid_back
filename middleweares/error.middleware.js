const ApiError = require("../exceptions/api.error");

module.exports = function (err, res) {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .staus(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(err.status).json({ message: err.message });
};
