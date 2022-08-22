const { model, Schema } = require("mongoose")

module.exports = new model("bankprecoin", new Schema({
  User: String,
  conis: Number
  })
)