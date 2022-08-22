const { model, Schema } = require("mongoose")

module.exports = new model("bankepiccoin", new Schema({
  User: String,
  conis: Number
  })
)