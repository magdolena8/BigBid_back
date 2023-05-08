const ApiError = require("../exceptions/api.error");
const itemService = require("../services/items.service");

async function getUserCatalog(req, res, next) {
  try {
    const { userId } = req.params;
    res.json(await itemService.getUserCatalogItems(userId));
  } catch (err) {
    console.error(`Error catalog controller`, err.message);
    next(err);
  }
}

async function getAllMarketItems(req, res, next) {
  try {
    res.json(await itemService.getOwnerItems(1, 1));
  } catch (err) {
    console.error(`Error items controller`, err.message);
    next(err);
  }
}

async function getOwnerItems(req, res, next) {
  try {
    const { userId } = req.params;
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

async function getLikedItems(req, res, next) {
  try {
    const { userId } = req.params;
    res.json(await itemService.getLikedItems(userId));
  } catch (err) {
    console.error(`Error items controller`, err.message);
    next(err);
  }
}

async function getItemById(req, res, next) {
  const { itemId } = req.params;
  try {
    res.json(await itemService.getItemById(itemId));
  } catch (err) {
    next(err);
  }
}

async function likeItem(req, res, next) {
  try {
    const { userId } = req.params;
    const { itemId } = req.body;
    res.json(await itemService.likeItem(itemId, userId));
  } catch (err) {
    console.error(`Error items controller`, err.message);
    next(err);
  }
}

async function unlikeItem(req, res, next) {
  try {
    const { userId } = req.params;
    const itemId = req.query.itemId;
    res.json(await itemService.unlikeItem(itemId, userId));
  } catch (err) {
    console.error(`Error items controller`, err.message);
    next(err);
  }
}

module.exports = {
  getOwnerItems,
  getAllMarketItems,
  getItemById,
  getUserCatalog,
  getLikedItems,
  likeItem,
  unlikeItem,
};
