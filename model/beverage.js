var mongoose = require('mongoose');

var BeverageSchema = new mongoose.Schema ({
  name : String,
});

module.exports = mongoose.model('Beverage', BeverageSchema);