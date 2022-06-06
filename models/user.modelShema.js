const mongoose = require("mongoose");

const userData = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  roles: {
    type: String,
    enum: ["admin", "active", "inactive"],
  },
});

module.exports = mongoose.model("user", userData);
