const { model, Schema } = require("mongoose");

module.exports = new model(
  "kethon",
  new Schema({
    User: String,
    Bandoi: String,
  })
);