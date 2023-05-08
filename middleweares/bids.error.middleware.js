const BidsError = require("../exceptions/bids.error");

module.exports = function (err, req, res, next) {
  console.log(err);
  if (err instanceof BidsError) {
    return res
      .staus(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(err.status).json("{ message: err.message }");
};
