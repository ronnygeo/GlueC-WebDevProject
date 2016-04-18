/**
 * Created by Bhanu on 26/03/2016.
 */
var fs = require('fs');
var aws = require("aws-lib");
module.exports = function (app, q, listingModel, categoryModel, ebayAPIClient, upload, amazonAPIClient, uuid, categoryService) {

    /*WEB Service API*/
    app.post("/api/listing/", upload.single('image'), addImageAndCateogry);
    app.post("/api/listing/publish", publishListing);
    app.post("/api/listing/template", getNewListingTemplate);
    app.get("/api/listing/external/:providerId/:itemId", getSingleItemFromProvider);
    app.get("/api/listing/external/:keyword", findItemsFromProvider);


    function getSingleItemFromProvider(req, res) {
        console.log("getSingleItem");
        /*Getting Single Item from Ebay*/
        if (req.params.providerId == "10001") {
            getSingleItemFromEbay(req.params.itemId)
                .then(success_callback, error_callback);

            function success_callback(response) {
                res.json(response);
            }

            function error_callback(error) {
                console.log(error);
                res.statusCode(404).send(err);
            }

        }
    }

    function findItemsFromProvider(req, res) {
        console.log("Listing Service findItemsAdvanced");
        console.log('Keyword', req.params.keyword);
        var items = [];
        /*Step1: Get Providers*/

        /*Get Items from all the providers*/

        /*Getting the items from ebay*/
        findItemsFromEbay(req.params.keyword)
            .then(success_callback, error_callback);

        function success_callback(response) {
            //console.log(response);
            findItemsFromAmazon(req.params.keyword)
                .then(function (data) {
                    //console.log(data);
                    items = response.concat(data);
                    //response.sort();
                    console.log(items);
                    res.json(items);
                }, function (error) {
                    console.log(error);
                    res.statusCode(404).send(error);
                })
        }

        function error_callback(error) {
            console.log("Error Occurred while getting items from ebay");
            console.log(error);
            findItemsFromAmazon(req.params.keyword)
                .then(function (data) {
                    console.log(data);
                    res.json(data);
                }, function (error) {
                    console.log(error);
                    res.statusCode(404).send(error);
                })
        }
    }

    function getNewListingTemplate(req, res) {
        console.log("Inside ListingService.getNewListingTemplate");
        var listing = req.body;
        console.log(listing);
        listingModel.createNewListing(mapListing(listing))
            .then(function (listingDoc) {
                console.log(listingDoc);
                res.json(listingDoc);
            }, function (err) {
                console.log(err);
                res.statusCode(404).send(err);
            });
    }

    function publishListing(req, res) {
        console.log("Inside ListingService.publishListing");
        var listing = req.body;
        console.log(listing);
        if (listing.providerId == "10001") {

            //Step1: Publish Listing To Ebay
            publishListingToEbay(listing)
                .then(function (response) {
                    console.log(response);
                    //Step2: Get Listing From DB
                    listingModel.ebay.getListingById(listing._id)
                        .then(function (listingDoc) {
                            console.log(listingDoc);
                            //Step3: Save Publish Details to DB
                            listingDoc.isComplete = true;
                            listingDoc.title = listing.title;
                            listingDoc.description = listing.description;
                            listingDoc.price = listing.price;
                            listingDoc.mpn = listing.mpn;
                            listingDoc.model = listing.model;
                            listingDoc.ebay.itemCondition = listing.ebay.itemCondition;
                            listingDoc.ebay.ebayListingItemId = response;
                            listingDoc.ebay.ebayListingUrl = ebayAPIClient.trading.SANDBOX_URL + response;
                            listingModel.ebay.saveListing(listingDoc)
                                .then(function (response) {
                                    console.log("Saved Response Received");
                                    console.log(response);
                                    res.json(response);
                                }, function (err) {
                                    console.log(err);
                                    res.statusCode(404).send(err);
                                })

                        }, function (err) {
                            console.log(err);
                            res.statusCode(404).send(err);
                        });


                }, function (err) {
                    console.log(err)
                });
        }
    }


    function addImageAndCateogry(req, res) {
        console.log("Inside ListingService.addImageAndCateogry");
        var listing = req.body;
        listing['images'] = [req.file.path];
        console.log("Incoming Listing");
        console.log(listing);
        var newDbListing;

        if (listing.providerId == "10001") {
            //Step1: Create New Listing
            listingModel.ebay.getListingById(listing._id)
                .then(function (response) {
                    console.log(response);
                    newDbListing = response;

                    //Add Categories
                    newDbListing.ebay.parentCategory = listing.selectedParentCategory;
                    newDbListing.ebay.subCategory = listing.selectedSubCategory;

                    //Step2: Save Image and Ebay Url In Database
                    uploadImageToEbay(req.file)
                        .then(function (response) {
                            console.log(response);
                            newDbListing.ebay.siteHostedPictureDetails = response;

                            //Step3: Get Other Features For Category
                            categoryService.ebay.fetchCategoryDetails(newDbListing.ebay.subCategory)
                                .then(function (response) {
                                    console.log(response);

                                    //Sending New Listing Back to the Client
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

    function publishListingToEbay(listing) {
        var deferred = q.defer();
        var functionToCall = "AddItem";

        var uid = uuid.v1().replace(/-/g, '');
        console.log(uid);

        var requestData = '<?xml version="1.0" encoding="utf-8"?>' +
            '<AddItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">' +
            '<RequesterCredentials>' +
            '<eBayAuthToken>' + ebayAPIClient.trading.AUTH_TOKEN + '</eBayAuthToken>' +
            '</RequesterCredentials>' +
            '<ErrorLanguage>en_US</ErrorLanguage>' +
            '<WarningLevel>High</WarningLevel>' +
            '<Item>' +
            '<Title>' + listing.title + '</Title>' +
            '<Description>' + listing.description + '</Description>' +
            '<PrimaryCategory>' +
            '<CategoryID>' + listing.ebay.subCategory + '</CategoryID>' +
            '</PrimaryCategory>' +
            '<StartPrice currencyID="USD">0.99</StartPrice>' +
            '<BuyItNowPrice currencyID="USD">' + listing.price + '</BuyItNowPrice>' +
            '<ConditionID>' + listing.ebay.itemCondition.ID + '</ConditionID>' +
            '<CategoryMappingAllowed>true</CategoryMappingAllowed>' +
            '<Country>US</Country>' +
            '<Currency>USD</Currency>' +
            '<DispatchTimeMax>3</DispatchTimeMax>' +
            '<ListingDuration>Days_7</ListingDuration>' +
            '<ListingType>Chinese</ListingType>' +
            '<PaymentMethods>PayPal</PaymentMethods>' +
            '<PayPalEmailAddress>' + 'test@test.com' + '</PayPalEmailAddress>' +
            '<PictureDetails>' +
            '<GalleryType>Gallery</GalleryType>' +
            '<GalleryURL>' + listing.ebay.siteHostedPictureDetails.PictureSetMember[0].MemberURL + '</GalleryURL>' +
            '<PictureURL>' + listing.ebay.siteHostedPictureDetails.PictureSetMember[1].MemberURL + '</PictureURL>' +
            '<PictureURL>' + listing.ebay.siteHostedPictureDetails.PictureSetMember[2].MemberURL + '</PictureURL>' +
            '</PictureDetails>' +
            '<PostalCode>95125</PostalCode>' +
            '<Quantity>1</Quantity>' +
            '<ReturnPolicy>' +
            '<ReturnsAcceptedOption>ReturnsAccepted</ReturnsAcceptedOption>' +
            '<RefundOption>MoneyBack</RefundOption>' +
            '<ReturnsWithinOption>Days_30</ReturnsWithinOption>' +
            '<Description>Text description of return policy details</Description>' +
            '<ShippingCostPaidByOption>Buyer</ShippingCostPaidByOption>' +
            '</ReturnPolicy>' +
            '<ShippingDetails>' +
            '<ShippingType>Flat</ShippingType>' +
            '<ShippingServiceOptions>' +
            '<ShippingServicePriority>1</ShippingServicePriority>' +
            '<ShippingService>USPSMedia</ShippingService>' +
            '<ShippingServiceCost>2.50</ShippingServiceCost>' +
            '</ShippingServiceOptions>' +
            '</ShippingDetails>' +
            '<Site>US</Site>' +
            '<UUID>' + uid + '</UUID>' +
            '</Item>' +
            '</AddItemRequest>';

        ebayAPIClient.trading.function(functionToCall, requestData)
            .then(function (response) {
                console.log(response.AddItemResponse.ItemID[0]);
                deferred.resolve(response.AddItemResponse.ItemID[0])
            }, function (err) {
                console.log(err);
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function findItemsFromEbay(keyword) {
        var ebay_providerId = "10001";
        var deferred = q.defer();
        var functionToCall = "findItemsAdvanced";
        var urlData = "&keywords=" + keyword;
        urlData += "&paginationInput.entriesPerPage=50";
        //url += "&outputSelector=GalleryInfo";
        ebayAPIClient.finding.function(functionToCall, urlData)
            .then(function (res) {
                console.log(res);
                if (res.findItemsAdvancedResponse[0] &&
                    res.findItemsAdvancedResponse[0].searchResult[0] &&
                    res.findItemsAdvancedResponse[0].searchResult[0].item) {
                    deferred.resolve(
                        mapListingToGluecListing(res.findItemsAdvancedResponse[0].searchResult[0].item, ebay_providerId));
                } else {
                    console.log("Ebay API Call Failed");
                    deferred.reject("Ebay API Call Failed")
                }
            }, function (err) {
                console.log(err);
                deferred.reject(err)
            });
        return deferred.promise;

    }


    function findItemsFromAmazon(keyword) {
        var amazon_providerId = "10002";
        var deferred = q.defer();
        // console.log(keyword);
        var prodAdv = aws.createProdAdvClient("AKIAJIAF55AX5MUBCQYQ", "6WAxZ3AS8xvoKFjSfjwUJhjgq9jP7kQ5xlb+Ub+G", "glueclabs-20");
        var options = {SearchIndex: "All", Keywords: keyword, ResponseGroup: "Images,ItemAttributes,ItemIds"};
        prodAdv.call("ItemSearch", options, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                var items = result.Items.Item;
                deferred.resolve(mapListingToGluecListing(items, amazon_providerId));
            }
        });
        return deferred.promise;
    }

    function mapListingToGluecListing(apiListings, providerId) {
        var listings = [];
        for (var apiListingIndex in apiListings) {
            if (providerId == '10002') {
                listings.push(mapAmazonListingToGluecListing(apiListings[apiListingIndex]))
            } else if (providerId == '10001') {
                listings.push(mapEbayListingToGluecListing(apiListings[apiListingIndex]))
            }
        }
        return listings;
    }

    function mapAmazonListingToGluecListing(amazonListing) {
        var title, extId, desc, providerId, imageURL, providerURL;
        // console.log(ebayProduct.ImageSets.ImageSet[0].MediumImage.URL);
        title = amazonListing.ItemAttributes.Title;
        extId = amazonListing.ASIN;
        desc = amazonListing.ItemAttributes.Title;
        providerId = 10002;
        imageURL = amazonListing.LargeImage.URL;
        providerURL = amazonListing.DetailPageURL;

        var listing = {
            //"externalProductId": ebayProduct.productId[0].__value__,
            "externalItemId": extId,
            "title": title,
            "name": title,
            "manufacturer": "",
            "description": desc,
            "categories": [],
            "price": "",
            "discount": "",
            "providerId": providerId,
            "catalogId": "",
            "merchantId": "",
            "imageUrl": imageURL,
            "providerUrl": providerURL
        };
        return listing;
    }

    function mapEbayListingToGluecListing(ebayListing) {
        var title, extId, desc, providerId, imageURL, providerURL;

        title = ebayListing.title[0];
        extId = ebayListing.itemId[0];
        desc = "";
        providerId = 10001;
        imageURL = ebayListing.galleryURL[0];
        providerURL = "";

        var listing = {
            //"externalProductId": ebayProduct.productId[0].__value__,
            "externalItemId": extId,
            "title": title,
            "name": "",
            "manufacturer": "",
            "description": desc,
            "categories": [],
            "price": "",
            "discount": "",
            "providerId": providerId,
            "catalogId": "",
            "merchantId": "",
            "imageUrl": imageURL,
            "providerUrl": providerURL
        };
        return listing;
    }

    function getSingleItemFromEbay(itemId) {
        var deferred = q.defer();

        var functionToCall = "GetSingleItem";
        var urlData = "&ItemID=" + itemId;
        ebayAPIClient.shopping.function(functionToCall, urlData)
            .then(function (res) {
                console.log(res.Item);
                if (res.Item) {
                    deferred.resolve(mapEbaySingleFindToGluecListing(res.Item));
                } else {
                    deferred.reject("Cannot Find the Item from Ebay");
                }
            }, function (err) {
                console.log(err);
                deferred.reject(err)
            });
        return deferred.promise;
    }


    function mapEbaySingleFindToGluecListing(ebayProduct) {
        var product = {
            //"externalProductId": ebayProduct.productId[0].__value__,
            "externalItemId": ebayProduct.ItemID,
            "title": ebayProduct.Title,
            "name": "",
            "manufacturer": "",
            "description": "",
            "categories": [],
            "price": "",
            "discount": "",
            "providerId": 10001,
            "catalogId": "",
            "merchantId": "",
            "imageUrl": ebayProduct.PictureURL[0],
            "providerUrl": ebayProduct.ViewItemURLForNaturalSearch
        };
        return product;
    }
};