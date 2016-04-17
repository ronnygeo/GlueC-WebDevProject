var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var q = require("q");
var uuid = require("node-uuid");
var aws = require   ("aws-lib");
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var mongoose = require("mongoose");
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));

/*Multer Storage Config*/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/listing')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
var upload = multer({storage: storage});

//Multer for Users
var userImageStore = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/app/media/images/users')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
var userImageUpload = multer({storage: userImageStore}).single('file');

    //Security
app.use(session({
    secret: 'this is our little secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


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
mongoose.connect(connectionString);

app.use(express.static(__dirname + '/public/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/hello', function (req, res) {
    res.send('hello world');
});


/*Injecting Server App*/
require("./modules/app.js")(app, request, q, upload, mongoose, uuid, userImageUpload);

app.listen(port, ipaddress);