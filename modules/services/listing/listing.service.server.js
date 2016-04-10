/**
 * Created by Bhanu on 26/03/2016.
 */
var s3Upload = require('s3-uploader'),
    fs = require('fs'),
    S3FS = require('s3fs'),	//abstraction over Amazon S3's SDK
    s3fsImpl = new S3FS('gluec-listing-images', {
        accessKeyId: 'AKIAJGLCCC33Q36BY4EA',
        secretAccessKey: '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'
    });

module.exports = function (app, listingModel, categoryModel, ebayAPIClient, upload, amazonAPIClient) {

    app.post("/api/listing/", upload.single('image'), createNewListing);
    //app.post("/api/listing/", createNewListing);

    function createNewListing(req, res) {

        console.log("Inside ListingService.getNewListingTemplate");
        var listing = req.body;
        listing['images'] = [req.file.path];
        console.log("Incoming Listing");
        console.log(listing);

        if (listing.providerId == "10001") {
            //TODO: Step1: Create New Listing
            listingModel.ebay.createNewListing(mapListing(listing))
                .then(function (response) {
                    console.log("Step One Completed");
                    console.log(response);
                    var listing = response;

                    //TODO: Step2: Save Image and Ebay Url In Database
                    uploadToAmazon(req.file)
                        .then(function (response) {
                            console.log(response);

                            //TODO: Step5: Get Other Features For Category
                            listingModel.ebay
                                .populateFeatures(newListing._id)
                                .then(function (response) {
                                    console.log(response);
                                    //Sending New Listing Back to the Client.
                                    res.json(response);

                                }, function (error) {
                                    console.log(error);
                                    res.statusCode(404).send(err);
                                });
                        }, function (error) {
                            console.log(error);
                            res.statusCode(404).send(err);
                        });

                }, function (error) {
                    console.log(error);
                    res.statusCode(404).send(err);
                });
        }

        /*/!*Getting the mandatory features for the category*!/
         var categoryFeatures = CategoryModel
         .ebay.getFeaturesForCategory(subCategotyId)
         .then(success_callback, error_callback);

         function success_callback(response) {
         console.log(response);
         //res.json(response);

         /!*Uploading Image to the Ebay Server*!/
         }

         function error_callback(error) {
         console.log(error);
         res.statusCode(404).send(err);
         }*/

    }

    function mapListing(listing) {

        var newListing = {
            userId: listing.userId,
            parentCategory: listing.parentCategory,
            subCategory: listing.subCategory,
            providerId: listing.providerId,
            title: listing.title,
            description: listing.description,
            images: listing.images,
            ebay: {
                ebayListingId: listing.ebay_ebayListingId,
                parentCategory: listing.ebay_parentCategory,
                subCategory: listing.ebay_subCategory,
                itemCondition: listing.ebay_itemCondition,
                listingType: listing.ebay_listingType,
                paymentMethod: listing.ebay_paymentMethod,
                returnPolicyEnabled: listing.ebay_returnPolicyEnabled,
                listingDuration: listing.ebay_listingDuration
            },
            model: listing.model,
            mpn: listing.mpn
        };

        console.log("Mapped Listing");
        console.log(newListing);
        return newListing
    }

    function uploadImageToEbay(imageLocation, imageName) {
        console.log("Inside ListingService.uploadImageToEbay");

        fs.readFile(imageLocation, function (err, data) {
            //var imageBinaryData = new Buffer(data).toString('base64');
            console.log(data);
            var functionToCall = 'UploadSiteHostedPictures';
            var requestData = '<?xml version="1.0" encoding="utf-8"?>' +
                '<UploadSiteHostedPicturesRequest xmlns="urn:ebay:apis:eBLBaseComponents">' +
                '<RequesterCredentials>' +
                '<eBayAuthToken>' +
                ebayAPIClient.trading.AUTH_TOKEN +
                '</eBayAuthToken>' +
                '</RequesterCredentials>' +
                '<WarningLevel>High</WarningLevel>' +
                '<PictureName>' + imageName + '</PictureName>' +
                '</UploadSiteHostedPicturesRequest>';

            ebayAPIClient.trading.uploadImage(data, requestData)
                .then(function (response) {

                }, function (error) {
                });
        });
    }

    /*function uploadImageToAmazon(imageLocation, imageName) {
     console.log("uploadImageToAmazon");

     var client = new s3Upload('gluec-listing-images', {
     aws: {
     path: 'images/',
     region: 'us-east-1',
     acl: 'public-read',
     accessKeyId: 'AKIAJGLCCC33Q36BY4EA',
     secretAccessKey: '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'
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

     client.upload("uploads\\image-1460256065678.jpg", {}, function (err, versions, meta) {
     if (err) {
     //console.log(err)
     } else {
     console.log("success");
     versions.forEach(function (image) {
     console.log(image.width, image.height, image.url);
     // 1234 4567 https://my-bucket.s3.amazonaws.com/path/ab/cd/ef.jpg
     });
     }

     });
     }*/


    function uploadToAmazon(file) {
        console.log(file);

        var stream = fs.createReadStream(file.path);
        console.log(stream);
        //writeFile calls putObject behind the scenes
        s3fsImpl.writeFile(file.filename, stream).then(function () {
            fs.unlink(file.path, function (err) {
                if (err) {
                    console.error(err);
                }
            });
            res.status(200).end();
        });
    }

};