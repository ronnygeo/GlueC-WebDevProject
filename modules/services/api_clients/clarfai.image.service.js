/**
 * Created by ronnygeo on 4/13/16.
 */
var Clarifai = require('clarifai'),
    client = new Clarifai({
        id: process.env.CLARIFAI_CLIENT_ID,
        secret: process.env.CLARIFAI_CLIENT_SECRET
    });
module.exports = function (q) {

    var api = {
        getImageLabels: getImageLabels
    };
    return api;

    function getImageLabels(imageUrl) {
        var deferred = q.defer();
        var url = "http://thumbs1.ebaystatic.com/pict/221915749304404000000002_1.jpg";
        client.tagFromUrls('image', imageUrl, function (err, results) {
            // Callback code here
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(results.tags);
                var data = results.tags;
                var keywords = [];
                for (key in results.tags) {
                    keywords.push(results.tags[key].class);
                }
                console.log(keywords);
                deferred.resolve(keywords);
            }
        });
        return deferred.promise;
    }




};