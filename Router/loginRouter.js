const express = require("express");
const router = express.Router();
const { getLogin, postLogin } = require("../Controller/loginController");

router.get("/", getLogin);
router.post("/", postLogin);
// router.post("/", async (req, res) => {
//   console.log(req.body);
// });
module.exports = router;
