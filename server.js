var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/beverages_test');

var router = require('./routes/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

app.use('/api/', router);

app.listen(3000);
console.log('Server up at port 3000');