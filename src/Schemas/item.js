const mongodb = require('mongoose');

const itemUser = new mongodb.Schema({
  id: String,
  item: [String]
});
module.exports = mongodb.model("item", itemUser);