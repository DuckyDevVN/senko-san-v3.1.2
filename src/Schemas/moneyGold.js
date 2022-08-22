const { model, Schema } = require("mongoose")

module.exports = new model("senkogoldcoin", new Schema({
  User: String,
  conis: Number
  })
)