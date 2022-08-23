const { model, Schema } = require("mongoose");

module.exports = model(
  "vatlieu",
  new Schema({
    User: String,
    Invemtory: Object,
  })
)