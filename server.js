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
var mongoose = require("mongoose");


app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var upload = multer({ //multer settings
    storage: storage
    //storage: s3({
    //    dirname: '/',
    //    bucket: 'gluec-listing-images',
    //    accessKeyId: 'AKIAJGLCCC33Q36BY4EA',
    //    secretAccessKey: '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',
    //    region: 'us-east-1',
    //    key: function (req, file, cb) {
    //        var datetimestamp = Date.now();
    //        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    //    }
    //})
});
// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/Gluec';

// use remote connection string
// if running in remote server
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
// connect to the database
var db = mongoose.connect(connectionString);

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/hello', function (req, res) {
    res.send('hello world');
});

/*Injecting Server App*/
require("./modules/app.js")(app, request, q, uuid, upload, mongoose);

app.listen(port, ipaddress);