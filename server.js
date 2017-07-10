// Express initialization
var express = require('express');
var app = express();
var http = require('http');
var Twitter = require('twitter-node-client').Twitter;

mongodb://agreenspan24:Tchaikovsky's1812@testcluster-shard-00-00-jompl.mongodb.net:27017,testcluster-shard-00-01-jompl.mongodb.net:27017,testcluster-shard-00-02-jompl.mongodb.net:27017/?ssl=true&replicaSet=TestCluster-shard-0&authSource=admin

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var ObjectId = require('mongodb').ObjectID;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
    db = databaseConnection;
});

var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log('Data [%s]', data);
};
{
    "consumerKey": "XXX",
    "consumerSecret": "XXX",
    "accessToken": "XXX",
    "accessTokenSecret": "XXX",
    "callBackUrl": "XXX"
}
app.get('/', function (request, response) {
    response.set('Content-Type', 'text/html');

    //https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=teacher2teacher&count=50
    var twitter = new Twitter();

    //Example calls

    twitter.getUserTimeline({ screen_name: 'teacher2teacher', count: '50'}, error, success);

    db.collection('statuses', function(error, coll) {
        results.forEach(function(result){
            coll.insert(result, function(error, saved) {
                if (error) {
                    console.log("Error: " + error);
                    response.send(500);
                }
                else {
                    response.send('<html><head><title>Thanks!</title></head><body><h2>Thanks for your submission!</h2></body></html>');
                }
            });
        })
    });

    response.send('<p>Hey, it works!</p>');
});

app.listen(process.env.PORT || 3000);