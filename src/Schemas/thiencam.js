const { model, Schema } = require("mongoose");

module.exports = new model(
  "TCSenko",
  new Schema({
    User: String,
    coins: Number,
  })
);
