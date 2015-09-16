var Beverages = require(__dirname + '/../model/beverage');
var bodyParser = require('body-parser').json();
var express = require('express');
var handleError = require(__dirname + '/../lib/handle_error');
var router = module.exports = exports = express.Router();

router.get("/", function (req, res) {
  res.json({msg:"Enter \/api\/beverages to see beverages"});
});

router.get('/beverages', function (req, res) {
  Beverages.find({}, function (err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

router.post('/beverages', bodyParser, function (req, res) {
  var newBeverage = new Beverages(req.body);
  newBeverage.save(function (err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

router.put('/beverages/:id', bodyParser, function (req, res) {
  var newBeverage = req.body;
  delete newBeverage._id;
  Beverages.update({_id: req.params.id}, newBeverage, function (err, data) {
    if (err) return handleError(err, res);
    res.json({msg:"Success putting data!"});
  });
});

router.get('/beverages/:id', function (req, res) {
  Beverages.findOne({_id: req.params.id}, function (err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

router.delete('/beverages/:id', function (req, res) {
  Beverages.remove({_id: req.params.id}, function (err, data) {
    if (err) return handleError(err, res);
    res.json({msg:"Beverage deleted"});
  });
});

