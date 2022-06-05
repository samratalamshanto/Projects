const express = require("express");
const router = express.Router();
const { getUser, postUser, delUser } = require("../Controller/loginController");

router.get("/", getUser);
router.post("/", postUser);
router.get("/:id/delete", delUser);

module.exports = router;
