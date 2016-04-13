/**
 * Created by Bhanu on 26/03/2016.
 */
var fs = require('fs');
module.exports = function (app, q, listingModel, categoryModel, ebayAPIClient, upload, amazonAPIClient) {

    /*WEB Service API*/
    app.post("/api/listing/", upload.single('image'), createNewListing);

    function createNewListing(req, res) {
        console.log("Inside ListingService.getNewListingTemplate");
        var listing = req.body;
        listing['images'] = [req.file.path];
        console.log("Incoming Listing");
        console.log(listing);
        var newDbListing;

        if (listing.providerId == "10001") {
            //Step1: Create New Listing
            listingModel.ebay.createNewListing(mapListing(listing))
                .then(function (response) {
                    console.log("Step One Completed");
                    console.log(response);
                    newDbListing = response;
                    //Step2: Save Image and Ebay Url In Database
                    uploadImageToEbay(req.file)
                        .then(function (response) {
                            console.log(response);
                            newDbListing.ebay.siteHostedPictureDetails = response;

                            //Step3: Get Other Features For Category
                            getFeaturesForCategory(newDbListing.ebay.parentCategory)
                                .then(function (response) {
                                    console.log(response);
                                    //Sending New Listing Back to the Client.4
                                    newDbListing.ebay.categoryDetails = response;
                                    console.log(newDbListing);

                                    //Step 4: Save the listing to DB
                                    listingModel.ebay.saveListing(newDbListing)
                                        .then(function (response) {
                                            console.log("Saved Response Received");
                                            console.log(response);
                                            res.json(response);
                                        }, function (err) {
                                            console.log(err);
                                            res.statusCode(404).send(err);
                                        })
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

    }

    function getFeaturesForCategory(subCategoryId) {
        var deferred = q.defer();
        var functionToCall = "GetCategoryFeatures";
        var requestData = '<?xml version="1.0" encoding="utf-8"?>' +
            '<GetCategoryFeaturesRequest  xmlns="urn:ebay:apis:eBLBaseComponents">' +
            '<RequesterCredentials>' +
            '<eBayAuthToken>' +
            ebayAPIClient.trading.AUTH_TOKEN +
            '</eBayAuthToken>' +
            '</RequesterCredentials>' +
            '<WarningLevel>High</WarningLevel>' +
            '<CategoryID>' + subCategoryId + '</CategoryID>' +
            '<DetailLevel>ReturnAll</DetailLevel>' +
            '<ViewAllNodes >True</ViewAllNodes >' +
            '<AllFeaturesForCategory >True</AllFeaturesForCategory >' +
            '</GetCategoryFeaturesRequest>';
        ebayAPIClient.trading.function(functionToCall, requestData)
            .then(function (response) {
                console.log(response.GetCategoryFeaturesResponse.Category[0]);
                var categoryDetails = response.GetCategoryFeaturesResponse.Category[0];
                categoryDetails.ListingDuration = mapListingDuration(categoryDetails.ListingDuration);
                deferred.resolve(categoryDetails);
            }, function (err) {
                console.log(err);
                deferred.reject(err);
            });
        return deferred.promise;

    }

    function mapListingDuration(listingDuration) {
        console.log(listingDuration);
        var newListingDuration = [];
        for (var index in listingDuration) {
            var dur = listingDuration[index]._;
            console.log(dur);
            newListingDuration.push(dur)
        }
        console.log(newListingDuration);
        return newListingDuration;

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


    function uploadImageToEbay(file) {
        console.log("Inside ListingService.uploadImageToEbay");
        var deferred = q.defer();
        /*Upload File To Amazon S3*/
        amazonAPIClient.uploadToAmazonS3(file)
            .then(
                function (response) {
                    /*Upload File from Amazon to Ebay*/
                    if (response) {
                        var imageLocation = amazonAPIClient.AMAZON_S3_BUCKET_ADDRESS + file.filename;
                        var functionToCall = 'UploadSiteHostedPictures';
                        var requestData = '<?xml version="1.0" encoding="utf-8"?>' +
                            '<UploadSiteHostedPicturesRequest xmlns="urn:ebay:apis:eBLBaseComponents">' +
                            '<RequesterCredentials>' +
                            '<eBayAuthToken>' +
                            ebayAPIClient.trading.AUTH_TOKEN +
                            '</eBayAuthToken>' +
                            '</RequesterCredentials>' +
                            '<WarningLevel>High</WarningLevel>' +
                            '<ExternalPictureURL>' + imageLocation + '</ExternalPictureURL>' +
                            '</UploadSiteHostedPicturesRequest>';
                        ebayAPIClient.trading.function(functionToCall, requestData)
                            .then(function (response) {
                                console.log(response.UploadSiteHostedPicturesResponse.SiteHostedPictureDetails[0]);
                                deferred.resolve(response.UploadSiteHostedPicturesResponse.SiteHostedPictureDetails[0]);
                            }, function (err) {
                                console.log(err);
                                deferred.reject(err);
                            });
                    } else {
                        console.log("Error Uploading File to Amazon S3");
                        deferred.reject("Error Uploading File to Amazon S3");
                    }
                },
                function (err) {
                    console.log(err);
                    deferred.reject(err);

                });
        return deferred.promise;
    }
};