const express = require("express");
const router = express.Router();
const { getUser } = require("../Controller/loginController");

router.get("/", getUser);
module.exports = router;
