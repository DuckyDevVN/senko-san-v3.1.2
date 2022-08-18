const mongodb = require('mongoose');

module.exports = mongodb.model('bank', 
  new mongodb.Schema({
    id: String,
    coins: Number
  })
)