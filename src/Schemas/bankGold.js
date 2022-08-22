const { model, Schema } = require("mongoose")

module.exports = new model("bankgoldcoin", new Schema({
  User: String,
  conis: Number
  })
)