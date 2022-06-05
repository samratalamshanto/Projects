require("dotenv").config();

//modelsSchema
const articleModel = require("../models/articles.modelSchema");
const userModel = require("../models/user.modelShema");

//hash password
const bcrypt = require("bcrypt");

//json web token
const jwt = require("jsonwebtoken");

//get
async function getLogin(req, res, next) {
  res.render("index");
}

async function getUser(req, res, next) {
  const fetchUser = await userModel.find({}).sort("-date");
  res.render("user", { fetchUser });
}

async function getArticles(req, res, next) {
  const fetchArticle = await articleModel.find({}).sort("-date");
  res.render("articles", { fetchArticle });
}

//post

async function postLogin(req, res, next) {
  const { email, password } = req.body;
  console.log(req.body);
  console.log(email);
  console.log(password);
  if (email == "" || password == "") {
    return res.redirect("/");
  }
  await userModel.findOne({ email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({
            ERR: "Error!!!",
          });
        }
        if (result) {
          //success
          //jwt token
          console.log("sucessdully login");
          const token = jwt.sign(
            {
              email,
              userId: user._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "30 days",
            }
          );
          res.cookie(process.env.COOKIE_NAME, token, {
            maxAge: "30 days",
            httpOnly: true,
            signed: ture,
          });
          res.json({
            " msg": "Logged IN!!!",
            " acess_token ": token,
          });
        } else {
          res.json({
            "  msg": "Authentication Failed!!",
          });
        }
      });
    } else {
      res.json({
        " msg": "404 not found!!",
      });
    }
  });
  res.render("index");
}

async function postUser(req, res, next) {
  const { username, email, password } = req.body;
  if (username == "" || email == "" || password == "") {
    alert("Please fill up properly to add user.....");
    return res.redirect("/user");
  }
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.log(err);
      res.json({
        error: err,
      });
    }

    const newUser = userModel({
      username,
      email,
      password: hash,
    });
    await newUser
      .save()
      .then((result) => {})
      .catch((err) => {
        console.log("error:    ", err);
      });
    res.redirect("/user");
  });
}

async function postArticles(req, res) {
  const article = req.body.article.trim();
  if (article == "") {
    return res.redirect("/articles");
  }

  let newArticle = new articleModel({
    article,
  });
  await newArticle.save();
  res.redirect("/articles");
}

//delete
async function delArticles(req, res, next) {
  await articleModel.findByIdAndDelete(req.params.id);
  res.redirect("/articles");
}
async function delUser(req, res, next) {
  await userModel.findByIdAndDelete(req.params.id);
  res.redirect("/user");
}

module.exports = {
  getLogin,
  getUser,
  getArticles,
  postArticles,
  delArticles,
  postUser,
  delUser,
  postLogin,
};
