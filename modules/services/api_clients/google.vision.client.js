/**
 * Created by Bhanu on 25/04/2016.
 */
var vision = require('node-cloud-vision-api');
vision.init({auth: process.env.GOOGLE_VISION_API_KEY});

module.exports = function (q) {

    var api = {
        getImageLabels: getImageLabels
    };
    return api;

    function getImageLabels(imageUrl) {
        var deferred = q.defer();
        var req = new vision.Request({
            image: new vision.Image({
                url: imageUrl
            }),
            features: [
                new vision.Feature('LABEL_DETECTION', 1)
            ]
        });

        //send single request
        vision.annotate(req).then(function (res) {
            // handling response
            console.log(res);
            console.log(res.responses[0].labelAnnotations);
            deferred.resolve(processLabels(res.responses[0].labelAnnotations));
        }, function (e) {
            console.log('Error: ', e);
            deferred.reject(e);
        });
        return deferred.promise;
    }

    function processLabels(data) {
        var processedData = [];
        for (var i in data) {
            var label = data[i].description;
            var labelArray = label.split(" ");
            for (var j in labelArray)
                processedData.push(labelArray[j]);
        }
        return processedData;
    }
};