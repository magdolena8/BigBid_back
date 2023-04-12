require("dotenv").config();
const itemsRouter = require("./routes/items.route");
const usersRouter = require("./routes/users.route");
const marketRouter = require("./routes/market.route");

const express = require("express");
const dbConfig = require("./config/db.config");
const errorMiddleware = require("./middleweares/error.middleware");

var app = express();

const PORT = process.env.PORT || 5000;

app.use("/api/items", itemsRouter);
app.use("/api/users", usersRouter);
app.use("/api/market", marketRouter);

app.use(errorMiddleware);

app.listen(PORT, function () {
  console.log(`Listen to port ${PORT}`);
  //   const pool = mysql.createPool(dbConfig);
  //   pool.query("show tables", function (err, data) {
  //     if (err) return console.log(err);
  //     console.log(data);
  //   });
});
