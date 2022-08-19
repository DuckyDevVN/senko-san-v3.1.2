const { model, Schema } = require("mongoose");

module.exports = model(
  "inventory",
  new Schema({
    User: String,
    Invemtory: Object,
  })
)