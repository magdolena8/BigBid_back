require("dotenv").config();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");

const itemsRouter = require("./routes/items.route");
const usersRouter = require("./routes/users.route");
const marketRouter = require("./routes/market.route");
const authRouter = require("./routes/auth.route");
const bidsRouter = require("./routes/bids.route");

const express = require("express");
const dbConfig = require("./config/db.config");
const errorMiddleware = require("./middleweares/error.middleware");

var app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.raw({ extended: true }));
app.use(morgan("dev"));
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use("/api/items", itemsRouter);
app.use("/api/users", usersRouter);
app.use("/api/market", marketRouter);
app.use("/api/auth", authRouter);
app.use("/api/bids", bidsRouter);

//static
// app.use(express.static('/images'))
app.use("/api/image/avatar", (req, res, next) => {
  const avatarDir = path.join(__dirname, "image/avatar");
  const fileName = req.url.slice(1); // remove leading '/'
  // const extensions = [".png", ".jpg", ".jpeg"];
  // for (const ext of extensions) {
  // const filePath = path.join(avatarDir, fileName + ext);
  const filePath = path.join(avatarDir, fileName);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
    return;
  }
  // }
  next();
});

// app.use("/api/image/photo", (req, res, next) => {
//   const imageDir = path.join(__dirname, "image/photo");
//   const fileName = req.url.slice(1); // remove leading '/'
//   const extensions = [".png", ".jpg", ".jpeg"];
//   for (const ext of extensions) {
//     const filePath = path.join(imageDir, fileName + ext);
//     if (fs.existsSync(filePath)) {
//       res.sendFile(filePath);
//       return;
//     }
//   }
//   next();
// });
app.use("/api/image", express.static(path.join(__dirname, "image")));
// app.use("/api/avatar", express.static(path.join(__dirname, "avatar")));

app.use(errorMiddleware);

app.listen(PORT, function () {
  console.log(`Listen to port ${PORT}`);
  //   const pool = mysql.createPool(dbConfig);
  //   pool.query("show tables", function (err, data) {
  //     if (err) return console.log(err);
  //     console.log(data);
  //   });
});
