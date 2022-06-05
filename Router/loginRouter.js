const express = require("express");
const router = express.Router();
const { getLogin, postLogin } = require("../Controller/loginController");

router.get("/", getLogin);
router.post("/", postLogin);

module.exports = router;
