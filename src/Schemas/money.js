const mongodb = require("mongoose");

module.exports = mongodb.model(
  "money",
  new mongodb.Schema({
    id: String,
    coins: Number,
  })
);
