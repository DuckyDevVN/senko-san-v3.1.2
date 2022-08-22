const { model, Schema } = require("mongoose")

module.exports = new model("senkoprecoin", new Schema({
  User: String,
  conis: Number
  })
)