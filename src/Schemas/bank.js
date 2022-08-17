const { model, Schema } = require('mongoose');

const bankUser = new Schema({
  id: { type: String },
  coins: Number
})

module.exports = model('bank', bankUser)