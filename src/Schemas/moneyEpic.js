const { model, Schema } = require("mongoose")

module.exports = new model("senkoepiccoin", new Schema({
  User: String,
  conis: Number
  })
)