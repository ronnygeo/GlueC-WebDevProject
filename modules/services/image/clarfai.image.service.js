/**
 * Created by ronnygeo on 4/13/16.
 */

module.exports = function () {
    var Clarifai = require('clarifai'),
        client = new Clarifai({
            id: process.env.CLARIFAI_CLIENT_ID,
            secret: process.env.CLARIFAI_CLIENT_SECRET
        });

    var url = "http://thumbs1.ebaystatic.com/pict/221915749304404000000002_1.jpg";
    client.tagFromUrls('image', url, function (err, results) {
        // Callback code here
        if (err) {
            console.log(err);
        } else {
            //console.log(results.tags.probability);
            var data = results.tags;
            var keywords = [];
            for (key in results.tags) {
                keywords.push(results.tags[key].class);
            }
            console.log(keywords);
        }
    })
};