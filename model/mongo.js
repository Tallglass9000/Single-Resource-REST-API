//this code is from codeforgeek.com/2015/08/restful-api-node-mongodb/
var mongo = require('mongodb');
var mongoose = require('mongoose');


var Server = mongo.Server;
var Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('beverageDB', server);

mongoose.connect('mongodb://localhost:27017/beverageDB');

var Schema = mongoose.Schema;
var BeverageSchema = new Schema ({
  "_id" : String,
  "name" : String,
  "__v" : Number
});

module.exports = mongoose.model('Beverage', BeverageSchema);
