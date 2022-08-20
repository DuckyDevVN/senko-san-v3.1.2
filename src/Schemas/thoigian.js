const { model, Schema } = require("mongoose");

module.exports = new model(
  "thoigian",
  new Schema({
    User: String,
    Thoigian: Number,
  })
);
