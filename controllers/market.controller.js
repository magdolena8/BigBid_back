const ApiError = require("../exceptions/api.error");
const marketService = require("../services/market.service");

async function getMarketItems(req, res, next) {
  const { user, page, filter } = req.query;

  console.log(filter);
    res.json(await marketService.getMarketItems(user, filter, page));
}

module.exports = {
  getMarketItems,
};
