// Express initialization
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Twitter = require('twitter-node-client').Twitter;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var mongoUri = 'mongodb://localhost:27017/AnneLewis';
var MongoClient = require('mongodb').MongoClient;
var AnneLewis = MongoClient.connect(mongoUri, function(error, databaseConnection) {
    AnneLewis = databaseConnection;
});

var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    var parsedData = JSON.parse(data);
    parsedData.forEach(function(element) {
        AnneLewis.collection('statuses').insertOne(element);
    });
};
var twitter = new Twitter({
    "consumerKey": "0TzKzv9lrA54H1qqZzXwxDlOX",
    "consumerSecret": "a48PJ04oiFPhmVPtxOwGfIIRxoLt15oP9EFH8JHk215YYXuD1z"
});

twitter.getUserTimeline({screen_name: 'teacher2teacher', count: '50'}, error, success);

app.get('/teacher2teacher', function (request, response) {
    response.set('Content-Type', 'application/json');

    AnneLewis.collection('statuses').find().toArray(function (error, data) {
        response.send(data);
    });

});

app.listen(process.env.PORT || 3000);