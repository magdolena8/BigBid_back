const service = require("../services/users.service");

async function get(req, res, next) {
  try {
    res.json(await service.getUserList());
    // res.json(
    //   pool.query("select * from person", function (err, data) {
    //     if (err) return console.log(err);
    //     return data;
    //   })
    // );
  } catch (err) {
    console.error(`Error while getting users from db`, err.message);
    next(err);
  }
}

module.exports = {
  get,
};
