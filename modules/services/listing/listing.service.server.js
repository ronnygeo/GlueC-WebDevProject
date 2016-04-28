/**
 * Created by Bhanu on 26/03/2016.
 */
var fs = require('fs'),
    aws = require("aws-lib"),
    path = require('path');
module.exports = function (app, q, listingModel, categoryModel, ebayAPIClient, upload, amazonAPIClient, uuid, categoryService, catalogService, googleVisionClint, clariFaiClient) {

    /*WEB Service API*/
    app.post("/api/listing/addDetails", upload.single('image'), addImageAndCategory);
    app.post("/api/listing/addCategory", addCategory);
    app.post("/api/listing/publish", publishListing);
    app.post("/api/listing/template/direct", getDirectListingTemplate);
    app.post("/api/listing/template/similar", getSimilarListingTemplate);
    app.post("/api/listing/template/image", upload.single('image'), getImageListingTemplate);
    app.post("/api/listing/template/prod", getProdListingTemplate);
    app.get("/api/listing/external/:providerId/:itemId", getItemFromProvider);
    app.get("/api/listing/external/:keyword", findItemsFromProvider);
    app.get("/api/listings/:userId", getAllListingsForUser);
    app.delete("/api/listing/:listingId", deleteListing);
    app.get("/api/listing/:listingId", findListing);

    function findListing(req, res) {
        console.log("Server findListing");
        console.log(req.params.listingId);
        listingModel.findListingById(req.params.listingId)
            .then(success_callback, error_callback);
        function success_callback(response) {
            console.log("response", response);
            res.json(response);
        }

        function error_callback(error) {
            console.log("Error", error);
            res.status(400).send(error);
        }
    }

    function deleteListing(req, res) {
        console.log("Server deleteListing");
        console.log(req.params.listingId);
        listingModel.deleteListingWithId(req.params.listingId)
            .then(success_callback, error_callback);
        function success_callback(response) {
            console.log("response", response);
            res.json(response);
        }

        function error_callback(error) {
            console.log("Error", error);
            res.status(400).send(error);
        }
    }

    function getAllListingsForUser(req, res) {
        console.log("getSingleItem");
        listingModel.getAllListingsForUser(req.params.userId)
            .then(success_callback, error_callback);

        function success_callback(response) {
            res.json(response);
        }

        function error_callback(error) {
            console.log(error);
            res.statusCode(404).send(err);
        }
    }

    function getItemFromProvider(req, res) {
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
        var keywordString = "";
        var keyWordsArray = req.params.keyword.split(" ");
        for (var index in keyWordsArray) {
            if (index == (keyWordsArray.length - 1)) {
                keywordString += keyWordsArray[index] + ")"

            } else {
                keywordString += keyWordsArray[index] + ","
            }
        }
        console.log(keywordString);
        findItemsFromEbay(keywordString)
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

    function getDirectListingTemplate(req, res) {
        console.log("Inside ListingService.getDirectListingTemplate");
        var listing = req.body;
        listing.flow = "direct";
        console.log(listing);
        listingModel.createNewListing(mapDirectListingForTemplate(listing))
            .then(function (listingDoc) {
                console.log(listingDoc);
                res.json(listingDoc);
            }, function (err) {
                console.log(err);
                res.statusCode(404).send(err);
            });
    }

    function getProdListingTemplate(req, res) {
        console.log("Inside ListingService.getSimilarListingTemplate");
        var product = req.body;
        product.flow = "prod";
        console.log(product);
        //Step1: Map Product To Listing
        mapProductToListing(product)
            .then(function (listing) {
                    console.log(listing);
                    //Step 2: Create New Listing
                    listingModel.createNewListing(listing)
                        .then(function (dbListing) {
                                console.log(dbListing);
                                //Step2: Save Image and Ebay Url In Database
                                uploadImageOnlyToEbay(dbListing.images[0])
                                    .then(function (response) {
                                        console.log(response);

                                        //Image Upload Call Response
                                        dbListing.ebay.siteHostedPictureDetails = response;
                                        //Server Images
                                        dbListing.ebay.image = response.FullURL[0];
                                        //Step3: Get Other Features For Category
                                        categoryService.ebay.fetchCategoryDetails(dbListing.ebay.subCategory.code)
                                            .then(function (response) {
                                                console.log(response);

                                                //Sending New Listing Back to the Client
                                                dbListing.ebay.categoryDetails = response;
                                                console.log(dbListing);

                                                //Step 4: Save the listing to DB
                                                listingModel.ebay.saveListing(dbListing)
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
                            },
                            function (err) {
                                console.log(err);
                                res.statusCode(404).send(err);
                            })
                },
                function (err) {
                    console.log(err);
                    res.statusCode(404).send(err);
                })
    }


    function getImageListingTemplate(req, res) {
        console.log("Inside ListingService.getSimilarListingTemplate");

        var listing = req.body;
        var newListing = mapDirectListingForTemplate(listing);
        newListing.images = [req.file.path];
        newListing.flow = "image";
        //Step 1: Create New Listing
        listingModel.createNewListing(newListing)
            .then(function (dbListing) {
                console.log(dbListing);

                //Step2: Upload Image to Server
                uploadImageToEbay(dbListing.images[0])
                    .then(function (response) {
                        console.log(response);
                        //Image Upload Call Response
                        dbListing.ebay.siteHostedPictureDetails = response;
                        //Server Images
                        dbListing.ebay.image = response.FullURL[0];

                        //Step3: Get Image Keywords
                        clariFaiClient.getImageLabels(response.FullURL[0])
                            //googleVisionClint.getImageLabels(req.file.path)
                            .then(function (response) {
                                console.log(response);
                                //var keyWordsArray = response.splice(0, 5);
                                var keyWordsArray = response;
                                var keywordString = "(";
                                for (var index in keyWordsArray) {
                                    if (index == (keyWordsArray.length - 1)) {
                                        keywordString += keyWordsArray[index] + ")"

                                    } else {
                                        keywordString += keyWordsArray[index] + ","
                                    }
                                }
                                console.log(keywordString);
                                categoryService.ebay.getSuggestedCategories(keywordString)
                                    .then(function (response) {
                                        console.log("Successfully received suggested categories.");
                                        console.log(response);
                                        var suggestedCategories = response;

                                        //Step 4: Save the listing to DB
                                        listingModel.ebay.saveListing(dbListing)
                                            .then(function (response) {
                                                console.log("Saved Response Received");
                                                console.log(response);
                                                var data = {
                                                    listing: response,
                                                    suggestedCategories: suggestedCategories
                                                };
                                                res.json(data);
                                            }, function (err) {
                                                console.log(err);
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

                    }, function (error) {
                        console.log(error);
                        res.statusCode(404).send(err);
                    });

            }, function (error) {
                console.log(error);
                res.statusCode(404).send(err);
            });
    }

    function getSimilarListingTemplate(req, res) {
        console.log("Inside ListingService.getSimilarListingTemplate");
        var listing = req.body;
        listing.flow = "similar";
        console.log(listing);
        //Step 1: Create New Listing
        listingModel.createNewListing(listing)
            .then(function (listingDoc) {
                    console.log(listingDoc);
                    //Step 2: Get Other Details for Category
                    categoryService.ebay.fetchCategoryDetails(listingDoc.ebay.subCategory.code)
                        .then(function (response) {
                            console.log(response);

                            //Step 3:Setting Category Details in Listing
                            listingDoc.ebay.categoryDetails = response;
                            console.log(listingDoc);

                            //Step 4: Save the listing to DB
                            listingModel.ebay.saveListing(listingDoc)
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
                },
                function (err) {
                    console.log(err);
                    res.statusCode(404).send(err);
                }
            );
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
                            listingDoc.providerItemId = response;
                            listingDoc.description = listing.description;
                            listingDoc.price.value = listing.price.value;
                            listingDoc.price.currency = listing.price.currency;
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

    function addCategory(req, res) {
        console.log("Inside ListingService.addCategory");
        var listing = req.body;

        if (listing.providerId == "10001") {
            //Step1: Get Listing By Id
            listingModel.ebay.getListingById(listing._id)
                .then(function (response) {
                    console.log(response);
                    var dbListing = response;
                    dbListing.ebay.subCategory.code = listing.ebay.subCategory.code;
                    dbListing.ebay.subCategory.name = listing.ebay.subCategory.name;

                    //Step2: Get Other Features For Category
                    categoryService.ebay.fetchCategoryDetails(dbListing.ebay.subCategory.code)
                        .then(function (response) {
                            console.log(response);

                            //Sending New Listing Back to the Client
                            dbListing.ebay.categoryDetails = response;
                            console.log(dbListing);

                            //Step 3: Save the listing to DB
                            listingModel.ebay.saveListing(dbListing)
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
        }
    }

    function addImageAndCategory(req, res) {
        console.log("Inside ListingService.addImageAndCategory");
        var listing = req.body;
        listing['images'] = [req.file.path];
        console.log("Incoming Listing");
        console.log(listing);
        var dbListing;

        if (listing.providerId == "10001") {
            //Step1: Get Listing By Id
            listingModel.ebay.getListingById(listing._id)
                .then(function (response) {
                    console.log(response);
                    dbListing = response;

                    dbListing.providerId = listing.providerId;
                    //Add Categories and Other Details
                    dbListing.ebay.parentCategory.code = listing.selectedParentCategoryCode;
                    dbListing.ebay.parentCategory.name = listing.selectedParentCategoryName;
                    dbListing.ebay.subCategory.code = listing.selectedSubCategoryCode;
                    dbListing.ebay.subCategory.name = listing.selectedSubCategoryName;
                    dbListing.ebay.description = listing.description;
                    dbListing.ebay.price = listing.price;
                    dbListing.ebay.title = listing.title;
                    //Step2: Save Image and Ebay Url In Database
                    console.log(req.file);
                    uploadImageToEbay(req.file.path)
                        .then(function (response) {
                            console.log(response);
                            //Local Image Path
                            dbListing.images = listing.images[0];
                            //Image Upload Call Response
                            dbListing.ebay.siteHostedPictureDetails = response;
                            //Server Images
                            dbListing.ebay.image = response.FullURL[0];
                            //Step3: Get Other Features For Category
                            categoryService.ebay.fetchCategoryDetails(dbListing.ebay.subCategory.code)
                                .then(function (response) {
                                    console.log(response);

                                    //Sending New Listing Back to the Client
                                    dbListing.ebay.categoryDetails = response;
                                    console.log(dbListing);

                                    //Step 4: Save the listing to DB
                                    listingModel.ebay.saveListing(dbListing)
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

    function mapDirectListingForTemplate(listing) {
        var newListing = {
            userId: listing.userId,
            parentCategory: {
                code: "",
                name: ""
            },
            subCategory: {
                code: "",
                name: ""
            },
            providerId: listing.providerId,
            title: listing.title,
            description: listing.description,
            images: listing.images,
            ebay: {
                ebayListingItemId: "",
                ebayListingUrl: "",
                parentCategory: {
                    code: "",
                    name: ""
                },
                subCategory: {
                    code: "",
                    name: ""
                },
                itemCondition: {},
                listingType: "",
                paymentMethod: "",
                returnPolicyEnabled: "",
                listingDuration: "",
                categoryDetails: "",
                siteHostedPictureDetails: {},
                publishDetails: {},
                image: ""
            },
            model: listing.model,
            mpn: listing.mpn,
            flow: listing.flow,
            price: {
                value: "",
                currency: ""
            },
            startingPrice: listing.startingPrice,
            features: listing.features
        };

        console.log("Mapped Listing");
        console.log(newListing);
        return newListing
    }


    function uploadImageToEbay(filePath) {
        console.log("Inside ListingService.uploadImageToEbay");
        var deferred = q.defer();
        /*Upload File To Amazon S3*/
        amazonAPIClient.uploadImageToBucket(filePath, amazonAPIClient.AMAZON_LISTING_BUCKET_NAME)
            .then(
                function (response) {
                    /*Upload File from Amazon to Ebay*/
                    if (response) {
                        var imageLocation = response;
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


    function uploadImageOnlyToEbay(imageLocation) {
        console.log("Inside ListingService.uploadImageOnlyToEbay");
        var deferred = q.defer();
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
            '<CategoryID>' + listing.ebay.subCategory.code + '</CategoryID>' +
            '</PrimaryCategory>' +
            '<StartPrice currencyID="USD">0.99</StartPrice>' +
            '<BuyItNowPrice currencyID="USD">' + listing.price.value + '</BuyItNowPrice>' +
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
            '<GalleryURL>' + listing.ebay.image + '</GalleryURL>' +
            '<PictureURL>' + listing.ebay.image + '</PictureURL>' +
            '<PictureURL>' + listing.ebay.image + '</PictureURL>' +
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
        console.log(amazonListing);
        var title, extId, desc, providerId, imageURL, providerURL;
        // console.log(ebayProduct.ImageSets.ImageSet[0].MediumImage.URL);
        title = amazonListing.ItemAttributes.Title;
        extId = amazonListing.ASIN;
        desc = amazonListing.ItemAttributes.Title;
        providerId = 10002;
        if (amazonListing.LargeImage) {
            imageURL = amazonListing.LargeImage.URL;
        } else {
            imageURL = "/media/placeholder-new-listing-image.png";

        }
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

    function mapProductToListing(product) {
        var deferred = q.defer();
        catalogService.getCategoryForCatalog(product.catalogId)
            .then(function (parentCategory) {
                console.log(parentCategory);
                var newListing = {
                    userId: product.userId,
                    parentCategory: parentCategory,
                    subCategory: product.subCategory,
                    providerId: product.providerId,
                    title: product.name,
                    description: product.description,
                    images: [product.imageUrl],
                    ebay: {
                        ebayListingItemId: "",
                        ebayListingUrl: "",
                        parentCategory: parentCategory,
                        subCategory: product.subCategory,
                        itemCondition: {},
                        listingType: "",
                        paymentMethod: "",
                        returnPolicyEnabled: "",
                        listingDuration: "",
                        categoryDetails: "",
                        siteHostedPictureDetails: {},
                        publishDetails: {},
                        image: ""
                    },
                    model: "",
                    mpn: "",
                    flow: product.flow,
                    price: product.price,
                    startingPrice: "",
                    features: ""
                };

                console.log("Mapped Listing");
                console.log(newListing);
                deferred.resolve(newListing);
            }, function (err) {
                console.log(err);
                deferred.reject(err);
            });

        return deferred.promise;

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
        urlData += "&IncludeSelector=ItemSpecifics";
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
        var features = [];
        var external_listing = {};
        var ebay = {
            subCategory: {
                code: ebayProduct.PrimaryCategoryID,
                name: ebayProduct.PrimaryCategoryName
            },
            ebayListingItemId: ebayProduct.ItemID,
            image: ebayProduct.PictureURL[0],
            ebayListingUrl: ebayProduct.ViewItemURLForNaturalSearch
        };
        for (var i in ebayProduct.ItemSpecifics.NameValueList) {
            if (ebayProduct.ItemSpecifics.NameValueList[i].Name == 'Model') {
                external_listing['model'] = ebayProduct.ItemSpecifics.NameValueList[i].Value[0];
            } else if (ebayProduct.ItemSpecifics.NameValueList[i].Name == 'MPN') {
                external_listing['mpn'] = ebayProduct.ItemSpecifics.NameValueList[i].Value[0];
            } else {
                var feature = {};
                feature['name'] = ebayProduct.ItemSpecifics.NameValueList[i].Name;
                feature['value'] = ebayProduct.ItemSpecifics.NameValueList[i].Value[0];
                features.push(feature);
            }
        }
        external_listing['price'] = {
            value: ebayProduct.ConvertedCurrentPrice.Value,
            currency: ebayProduct.ConvertedCurrentPrice.CurrencyID
        };
        external_listing['title'] = ebayProduct.Title;
        external_listing['providerId'] = 10001;
        external_listing['features'] = features;
        external_listing['ebay'] = ebay;
        external_listing['providerItemId'] = ebayProduct.ItemID;
        return external_listing;
    }
};