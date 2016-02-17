#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var app = express();
var gulp = require('gulp');
var googlecdn = require('gulp-google-cdn');
//var fs = require('fs');

var IP = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static( __dirname + '/public' ));


gulp.task('default', function () {
    return gulp.src('index.html')
        .pipe(googlecdn(require('./bower.json')))
        .pipe(gulp.dest('dist'));
});

app.get('/hello', function(req, res){
    res.send("Hello World!");
});

app.listen(PORT, IP);