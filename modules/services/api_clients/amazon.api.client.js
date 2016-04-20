/**
 * Created by Bhanu on 09/04/2016.
 */
var fs = require('fs'),
    S3FS = require('s3fs'),	//abstraction over Amazon S3's SDK
    s3fsImpl = new S3FS('gluec-listing-images', {
        accessKeyId: 'AKIAJGLCCC33Q36BY4EA',
        secretAccessKey: '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'
    }),
    AMAZON_S3_BUCKET_ADDRESS = "http://s3.amazonaws.com/gluec-listing-images/",
    path = require('path');
module.exports = function (q) {

    var api = {
        AMAZON_S3_BUCKET_ADDRESS: AMAZON_S3_BUCKET_ADDRESS,
        uploadToAmazonS3: uploadToAmazonS3
    };
    return api;

    function uploadToAmazonS3(filePath) {
        var deferred = q.defer();
        console.log(filePath);
        console.log(path.basename(filePath));
        var stream = fs.createReadStream(filePath);
        console.log(stream);
        //writeFile calls putObject behind the scenes
        s3fsImpl.writeFile(path.basename(filePath), stream)
            .then(function () {
                    /*Do Not delete the file*/
                    //fs.unlink(file.path, function (err) {
                    //    if (err) {
                    //        console.error(err);
                    //        deferred.reject(err)
                    //    } else {
                    //        deferred.resolve(true);
                    //    }
                    //});
                    deferred.resolve(true);
                }, function (err) {
                    console.error(err);
                    deferred.reject(err)
                }
            );
        return deferred.promise;
    }
};