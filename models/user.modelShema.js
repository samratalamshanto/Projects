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
  },
  // types: {type: String,
  //    possibleValues : ['blue','red','yellow','black'],
  //   required: true},
});

module.exports = mongoose.model("user", userData);
