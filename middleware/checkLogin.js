const jwt = require("jsonwebtoken");
const { check } = require("express-validator");

const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { email, userId } = decoded;
  req.userId = userId;
  req.email = email;
  next();
};

module.exports = checkLogin;
