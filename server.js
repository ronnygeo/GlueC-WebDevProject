var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var q = require("q");
var uuid = require("node-uuid");
var aws = require("aws-lib");
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/hello', function (req, res) {
    res.send('hello world');
});

/*Injecting Server App*/
require("./modules/app.js")(app, request, q, uuid);

app.listen(port, ipaddress);