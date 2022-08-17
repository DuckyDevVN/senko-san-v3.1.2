const { model, Schema } = require('mongoose');

const moneyMember = new Schema({
  id: String,
  coins: Number
})
module.exports = model('money', moneyMember)