const mongoose = require("mongoose");

const articleData = mongoose.Schema({
  article: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Article", articleData);
