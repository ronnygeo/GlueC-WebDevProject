#!/bin/env node
//  OpenShift sample Node application
(function(){
var express = require('express');
var app = express();
//var fs = require('fs');

var IP = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static( __dirname + '/public' ));
app.use(express.static(__dirname + '/bower_components'));
app.get('/hello', function(req, res){
    res.send("Hello World!");
});

app.listen(PORT, IP);
})();

/**
 * On all requests add headers
 */
app.all('*', function(req, res,next) {


    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }


});