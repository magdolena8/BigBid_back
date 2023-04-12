const ApiError = require("../exceptions/api.error");
const itemService = require("../services/items.service");

async function getOwnerItems(req, res, next) {
  try {
    const { userId } = req.params;
    // const owner = req.path;
    const { page } = req.query;
    // console.log({ page, userId });
    console.log({ page });
    // console.log(req.params);

    res.json(await itemService.getOwnerItems(userId, page));
    // res.json(await itemService.getOwnerItems(owner, page));
    // res.json(await itemService.getItemOnMarket(owner, page));
  } catch (err) {
    console.error(`Error items controller`, err.message);
    next(err);
  }
}

async function getAllMarketItems(req, res, next) {
  try {
    const { user, page } = req.query;
    res.json(await itemService.getItemOnMarket(user, page));
  } catch (err) {
    ApiError.BadRequest(err.message, err);
    next(err);
  }
}

module.exports = {
  getOwnerItems,
  getAllMarketItems,
};
