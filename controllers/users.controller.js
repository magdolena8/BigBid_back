const usersService = require("../services/users.service");
const crypto = require("crypto");

async function get(req, res, next) {
  try {
    res.json(await usersService.getUserList());
  } catch (err) {
    console.error(`Error while getting users from db`, err.message);
    next(err);
  }
}

async function editUser(req, res, next) {
  try {
    const { username } = req.params;
    let image = req.files.image;
    let imageName = username;
    image.mv("./image/avatar/" + imageName);
    // const { title, category, decription, startPrice, aucDuration } = req.body;
    await usersService.editUser(username, imageName).then((result) => {
      res.json(imageName);
    });
    // res.json(imageName);
    // res.send(userId);
  } catch (err) {
    console.error(`Error users controller`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  editUser,
};
