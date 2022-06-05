require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
//router
const loginRouter = require("./Router/loginRouter");
const userRouter = require("./Router/userRouter");
const articleRouter = require("./Router/articlesRouter");
//middleware
const checkLogin = require("./middleware/checkLogin");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.set("view engine", "ejs");

//database connection
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
app.use("/articles", checkLogin, articleRouter);

module.exports = app;
