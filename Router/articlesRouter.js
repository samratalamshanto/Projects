const express = require("express");
const router = express.Router();
const {
  getArticles,
  postArticles,
  delArticles,
} = require("../Controller/loginController");

router.get("/", getArticles);

router.post("/", postArticles);

router.get("/:id/delete", delArticles);
module.exports = router;
