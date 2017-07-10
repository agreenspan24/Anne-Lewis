// Express initialization
var express = require('express');
var app = express();
var http = require('http');
var Twitter = require('twitter-node-client').Twitter;

var MongoClient = require('mongodb').MongoClient;
var mongoUri =  "mongodb://agreenspan24:Tchaikovsky's1812@testcluster-shard-00-00-jompl.mongodb.net:27017,testcluster-shard-00-01-jompl.mongodb.net:27017,testcluster-shard-00-02-jompl.mongodb.net:27017/?ssl=true&replicaSet=TestCluster-shard-0&authSource=admin";
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
    db = databaseConnection;
});

var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log('Data [%s]', data);
};

var twitter = new Twitter({
    "consumerKey": "0TzKzv9lrA54H1qqZzXwxDlOX",
    "consumerSecret": "a48PJ04oiFPhmVPtxOwGfIIRxoLt15oP9EFH8JHk215YYXuD1z",
    "accessToken": "970512554-iOdF04j6PnZnXSffqiaz0G9R5oIo099bFAFhXugA",
    "accessTokenSecret": "zCEzwEtvGnK9jbcAUAIk36kNzCSV5IkhkL8RZmsxsK5Zf",
    "callBackUrl": "https://vast-atoll-36697.herokuapp.com"
});


twitter.getUserTimeline({ screen_name: 'teacher2teacher', count: '50'}, error, success);

db.collection('statuses', function(error, coll) {
    results.forEach(function(result){
        coll.insert(result, function(error, saved) {
            if (error) {
                console.log("Error: " + error);
                response.send(500);
            }
            else {
                response.send();
            }
        });
    })
});
app.get('/teacher2teacher', function (request, response) {
    response.set('Content-Type', 'text/html');

    /*db.collection('statuses', function(error, coll) {
        response.send(coll.find());
    })*/
    //https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=teacher2teacher&count=50

    response.send('<p>Hey, it works!</p>');
});

app.listen(process.env.PORT || 3000);