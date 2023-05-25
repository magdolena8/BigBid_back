const ApiError = require("../exceptions/api.error");
const itemService = require("../services/items.service");
const crypto = require("crypto");

async function createLot(req, res, next) {
  try {
    const { userId } = req.params;
    let image = req.files.image;
    let imageName = crypto
      .createHash("md5")
      .update(image.name + Date.now())
      .digest("hex");
    image.mv("./image/photo/" + imageName);
    const { title, category, description, startPrice, aucDuration } = req.body;
    res.json(
      await itemService.createLot(
        userId,
        title,
        category,
        description,
        startPrice,
        aucDuration,
        imageName
      )
    );
    res.send(userId);
  } catch (err) {
    console.error(`Error catalog controller`, err.message);
    next(err);
  }
}

async function getUserCatalog(req, res, next) {
  try {
    const { userId } = req.params;
    const { filter } = req.query;
    console.log(filter);
    res.json(await itemService.getUserCatalogItems(userId, filter));
  } catch (err) {
    console.error(`Error catalog controller`, err.message);
    next(err);
  }
}
async function getAllItems(req, res, next) {
  try {
    const { filter } = req.query;
    console.log(filter);
    res.json(await itemService.getAllItems(filter));
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
    console.log({ page });
    res.json(await itemService.getOwnerItems(userId, page));
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

async function deleteItem(req, res, next) {
  const { itemId } = req.params;
  try {
    res.json(await itemService.deleteItem(itemId));
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

async function editItem(req, res, next) {
  try {
    const { itemId } = req.params;
    const { category, description, title } = req.body;
    res.json(await itemService.editItem(itemId, title, description, category));
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
  createLot,
  getAllItems,
  deleteItem,
  editItem,
};
