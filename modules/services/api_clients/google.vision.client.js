/**
 * Created by Bhanu on 25/04/2016.
 */
//var vision = require('node-cloud-vision-api');
//vision.init({auth: process.env.GOOGLE_VISION_API_KEY});

var gcloud = require('gcloud');

var fs = require('fs'),
    S3FS = require('s3fs'),	//abstraction over Amazon S3's SDK
    s3fsImpl = new S3FS('gluec-keys', {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECURITY_ACCESS_KEY
    });

module.exports = function (q) {

    var api = {
        getImageLabels: getImageLabels
    };
    return api;

    //function getImageLabels(imageUrl) {
    //    var deferred = q.defer();
    //    var req = new vision.Request({
    //        image: new vision.Image({
    //            url: imageUrl
    //        }),
    //        features: [
    //            new vision.Feature('LABEL_DETECTION', 1)
    //        ]
    //    });
    //
    //    //send single request
    //    vision.annotate(req).then(function (res) {
    //        // handling response
    //        console.log(res);
    //        console.log(res.responses[0].labelAnnotations);
    //        deferred.resolve(processLabels(res.responses[0].labelAnnotations));
    //    }, function (e) {
    //        console.log('Error: ', e);
    //        deferred.reject(e);
    //    });
    //    return deferred.promise;
    //}

    function getImageLabels(imageUrl) {
        var deferred = q.defer();
        /*Step1: Read Google Key File From Amazon S3*/
        s3fsImpl.readFile('google-keys.json', function (err, data) {
            if (err) {
                console.log(err);
                console.log('Unable to read');
                deferred.reject(err);
            } else {
                console.log(data);
                /*Step2: Save keys to local server*/
                fs.writeFile("./keys/google-key.json", data, function (err) {
                    if (err) {
                        console.log(err);
                        deferred.reject(err);
                    } else {
                        /*Step3: Create Vision Object*/
                        console.log('File Created in local.');
                        var vision = gcloud.vision({
                            projectId: process.env.GOOGLE_VISION_PROJECT_ID,
                            keyFilename: './keys/google-key.json'
                        });
                        /*Step4: Call Google Vision For Labels*/
                        vision.detectLabels(imageUrl, function (err, labels) {
                            if (err) {
                                console.log('Error: ', e);
                                deferred.reject(e);
                            } else {
                                console.log(labels);
                                /*Step5: Delete Keys File from App Server*/
                                fs.unlink('./keys/google-key.json', function (err) {
                                    if (err) {
                                        console.error(err);
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(processLabels(labels));
                                    }
                                });
                            }
                        });
                    }

                });
            }
        });

        return deferred.promise;
    }

    function processLabels(data) {
        var processedData = [];
        for (var i in data) {
            var label = data[i];
            var labelArray = label.split(" ");
            for (var j in labelArray)
                processedData.push(labelArray[j]);
        }
        return processedData;
    }
};