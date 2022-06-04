//modelsSchema
const articleModel = require("../models/articles.modelSchema");

//get
async function getLogin(req, res) {
  res.render("index");
}
function getUser(req, res, next) {
  res.render("index.html", {
    title: "login page",
  });
}

async function getArticles(req, res, next) {
  const fetchArticle = await articleModel.find({}).sort("-date");
  console.log(fetchArticle);
  res.render("articles", { fetchArticle });
}

//post
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

module.exports = {
  getLogin,
  getUser,
  getArticles,
  postArticles,
  delArticles,
};
