/**
 * Created by Bhanu on 09/04/2016.
 */
var fs = require('fs'),
    S3FS = require('s3fs'),	//abstraction over Amazon S3's SDK
    s3fsImpl = new S3FS('gluec-listing-images', {
        accessKeyId: 'AKIAJGLCCC33Q36BY4EA',
        secretAccessKey: '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'
    }),
    AMAZON_S3_BUCKET_ADDRESS = "http://s3.amazonaws.com/gluec-listing-images/";
module.exports = function (q) {

    var api = {
        uploadToAmazonS3: uploadToAmazonS3,
        AMAZON_S3_BUCKET_ADDRESS: AMAZON_S3_BUCKET_ADDRESS
    };
    return api;

    function uploadToAmazonS3(file) {
        var deferred = q.defer();
        console.log(file);
        var stream = fs.createReadStream(file.path);
        console.log(stream);
        //writeFile calls putObject behind the scenes
        s3fsImpl.writeFile(file.filename, stream).then(function () {
            fs.unlink(file.path, function (err) {
                if (err) {
                    console.error(err);
                    deferred.reject(err)
                } else {
                    deferred.resolve(true);
                }
            });
        });
        return deferred.promise;
    }

};