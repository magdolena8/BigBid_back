require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");

const itemsRouter = require("./routes/items.route");
const usersRouter = require("./routes/users.route");
const marketRouter = require("./routes/market.route");
const authRouter = require("./routes/auth.route");

const express = require("express");
const dbConfig = require("./config/db.config");
const errorMiddleware = require("./middleweares/error.middleware");

var app = express();

const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.raw({ extended: true }));

app.use("/api/items", itemsRouter);
app.use("/api/users", usersRouter);
app.use("/api/market", marketRouter);
app.use("/api/auth", authRouter);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({extended:true}))

//static
// app.use(express.static('/images'))
app.use("/api/images", express.static(path.join(__dirname, "images")));

app.use(errorMiddleware);

app.listen(PORT, function () {
  console.log(`Listen to port ${PORT}`);
  //   const pool = mysql.createPool(dbConfig);
  //   pool.query("show tables", function (err, data) {
  //     if (err) return console.log(err);
  //     console.log(data);
  //   });
});
