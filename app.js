const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const loginRouter = require("./Router/loginRouter");
const userRouter = require("./Router/userRouter");
const articleRouter = require("./Router/articlesRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//
app.set("view engine", "ejs");

//datbase connection
mongoose
  .connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection Done.");
  })
  .catch((err) => {
    console.log(err);
  });

//html files
app.use(express.static(path.join(__dirname, "public")));

//parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use("/", loginRouter);
app.use("/user", userRouter);
app.use("/articles", articleRouter);

module.exports = app;
