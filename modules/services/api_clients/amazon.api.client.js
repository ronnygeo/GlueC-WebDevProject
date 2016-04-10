/**
 * Created by Bhanu on 09/04/2016.
 */
var s3Upload = require('s3-uploader');

module.exports = function (q) {

    var api = {
        s3: {
            imageUpload: imageUpload
        }
    };
    return api;


    function imageUpload() {
        return new s3Upload('gluec-listing-images', {
            aws: {
                path: 'images/',
                region: 'us-east-1',
                acl: 'public-read',
                accessKeyId : 'AKIAJGLCCC33Q36BY4EA',
                secretAccessKey : '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'
            },

            cleanup: {
                versions: true,
                original: false
            },

            original: {
                awsImageAcl: 'private'
            },

            versions: [{
                maxHeight: 1040,
                maxWidth: 1040,
                format: 'jpg',
                suffix: '-large',
                quality: 80,
                awsImageExpires: 31536000,
                awsImageMaxAge: 31536000
            }, {
                maxWidth: 780,
                aspect: '3:2!h',
                suffix: '-medium'
            }, {
                maxWidth: 320,
                aspect: '16:9!h',
                suffix: '-small'
            }, {
                maxHeight: 100,
                aspect: '1:1',
                format: 'png',
                suffix: '-thumb1'
            }, {
                maxHeight: 250,
                maxWidth: 250,
                aspect: '1:1',
                suffix: '-thumb2'
            }]
        });
    }

};