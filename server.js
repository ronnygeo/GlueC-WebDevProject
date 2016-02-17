#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var app = express();
//var fs = require('fs');

var IP = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static( __dirname + '/public' ));
app.use(express.static( __dirname + '/bower_components' ));


app.get('/hello', function(req, res){
    res.send("Hello World!");
});

app.listen(PORT, IP);