#!/bin/env node
//  OpenShift sample Node application

var express = require('express'),
    cors = require('cors'),
    request = require('request');
var q = require("q");

var IP = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;
// var bodyParser    = require('body-parser');
// var multer        = require('multer');

var app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer());

app.use(cors());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.get('/hello', function (req, res) {
    res.send("Hello World!");
});

app.get("/api/getSingleItem/:itemId",getEbayItem);

function getEbayItem(req, res) {
    var itemId = req.params.itemId;
    var APP_ID = "BhanuJai-Gluec-PRD-d38ccaf50-a1104f30";
    var SHOPPING_API = "http://open.api.ebay.com/shopping";
    var url = SHOPPING_API;
    url += "?callName=GetSingleItem";
    url += "&responseencoding=JSON";
    url += "&appid=" + APP_ID;
    url += "&siteid=0";
    url += "&version=515";
    url += "&ItemID=" + itemId;
    console.log(url);
    request(url, function(error, response, body){
        if (!error && response.statusCode == 200) {
            return res.json(JSON.parse(body));
        }
    });
}

var userModel = require("./modules/models/user/user.model.js")(q);
require("./modules/services/user/user.service.js")(app, userModel);
// require("./modules/services/provider/ebay.service.js")(app, request);

app.listen(PORT, IP);
