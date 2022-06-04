const express = require("express");
const router = express.Router();
const { getLogin } = require("../Controller/loginController");

router.get("/", getLogin);
module.exports = router;
