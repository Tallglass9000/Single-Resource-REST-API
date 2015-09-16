//this code is from coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/
var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('beveragesdb', server);

db.open(function (err, db) {
  if(!err) {
    console.log("Connected to 'beveragesdb' database");
    db.collection('beverages', {strict:true}, function (err, collection) {
      if(err) {
        console.log("The 'beverages' collection does not exist.  Creating now with sample data.");
        populateDB();
      }
    });
  }
});

exports.readById = function (req, res) {
  var id = req.params.id;
  console.log('Retrieving beverage: ' + id);
  db.collection('beverages', function (err, collection) {
    collection.findOne({'_id':new BSON.ObjectID(id)}, function (err, item) {
      res.send(item);
    });
  });
};

exports.readAll = function (req, res) {
  db.collection('beverages', function (err, collection) {
    collection.find().toArray(function (err, items) {
      res.send(items);
    });
  });
};

exports.addBeverage = function (req, res) {
  var beverage = req.body;
  console.log('Adding beverage: ' + JSON.stringify(beverage));
  db.collection('beverages', function (err, collection) {
    collection.insert(beverage, {safe:true}, function (err, result) {
      if(err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
};

exports.deleteBeverage = function (req, res) {
  var id = req.params.id;
  console.log('Deleting beverage: ' + id);
  db.collection('beverages', function (err, collection) {
    collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function (err, result) {
      if(err) {
        res.send({'error':'An error of some type has occurred - ' + err});
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send(req.body);
      }
    });
  });
};

var populateDB = function () {
  var beverages = [{name: 'coffee'}, {name: 'tea'}, {name: 'cider'}, {name: 'beer'}];

  db.collection('beverages', function (err, collection) {
    collection.insert(beverages, {safe:true}, function (err, result) {});
  }); 
};