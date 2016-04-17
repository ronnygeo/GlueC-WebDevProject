/**
 * Created by Bhanu on 25/03/2016.
 */

module.exports = function (q, request, mongoose) {

    var aws = require("aws-lib");

    var ProductSchema = require("./product.schema.server.js")(mongoose);
    var ProductModel = mongoose.model('Product', ProductSchema);

    // var products = require('./product.local.test.json');

    var EBAY = {
        APP_ID: "BhanuJai-Gluec-PRD-d38ccaf50-a1104f30",
        FIND_API: "http://svcs.ebay.com/services/search/FindingService/v1",
        SHOPPING_API: "http://open.api.ebay.com/shopping"

    };

    var api = {
        product: {
            // findProductByUserId: findProductByUserId,
            // findProductByCatalogId: findProductByCatalogId,
            findProductById: findProductById,
            findAllProductsByUserId: findAllProductsByUserId,
            findAllProductsByCatalogId: findAllProductsByCatalogId,
            findAllProducts: findAllProducts,
            createProduct: createProduct,
            updateProduct: updateProduct,
            deleteProduct: deleteProduct
        },
        ebay: {
            findItemsByKeywords: findItemsByKeywords,
            findItemsAdvanced: findItemsAdvanced,
            findItemsByProduct: findItemsByProduct,
            getSingleItem: getSingleItem
        },
        amazon: {
            findItemsByKeywords: amazonFindItemsByKeywords
        }
    };
    return api;

    function getSingleItem(itemId) {
        console.log("Product Model - getSingleItem");
        var deferred = q.defer();
        var url = EBAY.SHOPPING_API;
        url += "?callName=GetSingleItem";
        url += "&responseencoding=JSON";
        url += "&appid=" + EBAY.APP_ID;
        url += "&siteid=0";
        url += "&version=515";
        url += "&ItemID=" + itemId;
        console.log(url);
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var res = JSON.parse(body);
                //console.log(res);
                //console.log(res.Item);
                if (res.Item) {
                    deferred.resolve(mapEbaySingleFindToGluecProduct(res.Item));
                } else {
                    deferred.reject("Cannot Find the Item from Ebay");
                }
            } else {
                console.log(error);
                deferred.reject(error);
            }
        });

        return deferred.promise;
    }

    function mapEbaySingleFindToGluecProduct(ebayProduct) {
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

    function findItemsByKeywords(keyword) {
        var url = EBAY.FIND_API;
        url += "?OPERATION-NAME=findItemsByKeywords";
        url += "&SERVICE-VERSION=1.0.0";
        url += "&SECURITY-APPNAME=" + EBAY.APP_ID;
        url += "&GLOBAL-ID=EBAY-US";
        url += "&RESPONSE-DATA-FORMAT=JSON";
        url += "&callback=JSON_CALLBACK";
        url += "&REST-PAYLOAD";
        url += "&keywords=" + keyword;
        url += "&paginationInput.entriesPerPage=40";
        return $http.jsonp(url);
    }

    function findItemsAdvanced(keyword) {
        var ebay_providerId = "10001";
        var deferred = q.defer();
        var url = EBAY.FIND_API;
        url += "?OPERATION-NAME=findItemsAdvanced";
        url += "&SERVICE-VERSION=1.0.0";
        url += "&SECURITY-APPNAME=" + EBAY.APP_ID;
        url += "&GLOBAL-ID=EBAY-US";
        url += "&RESPONSE-DATA-FORMAT=JSON";
        //url += "&callback=JSON_CALLBACK";
        url += "&REST-PAYLOAD";
        url += "&keywords=" + keyword;
        url += "&paginationInput.entriesPerPage=50";
        //url += "&outputSelector=GalleryInfo";

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var res = JSON.parse(body);
                if (res.findItemsAdvancedResponse[0] &&
                    res.findItemsAdvancedResponse[0].searchResult[0] &&
                    res.findItemsAdvancedResponse[0].searchResult[0].item) {
                    deferred.resolve(
                        mapListingToGluecListing(res.findItemsAdvancedResponse[0].searchResult[0].item, ebay_providerId));
                } else {
                    console.log("Ebay API Call Failed");
                    deferred.reject("Ebay API Call Failed")
                }
            } else {
                console.log(error);
                deferred.reject(error);
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

    function findItemsByProduct(productId, callback) {
        var url = EBAY.FIND_API;
        url += "?OPERATION-NAME=findItemsByProduct";
        url += "&SERVICE-VERSION=1.0.0";
        url += "&SECURITY-APPNAME=" + EBAY.APP_ID;
        url += "&GLOBAL-ID=EBAY-US";
        url += "&RESPONSE-DATA-FORMAT=JSON";
        url += "&callback=JSON_CALLBACK";
        url += "&REST-PAYLOAD";
        url += "&paginationInput.entriesPerPage=1";
        url += "&productId.@type=ReferenceID";
        url += "&productId=" + productId;
        return $http.jsonp(url);
    }


    function getEbayItem(req, res) {
        var itemId = req.params.itemId;
        var url = EBAY.SHOPPING_API;
        url += "?callName=GetSingleItem";
        url += "&responseencoding=JSON";
        url += "&appid=" + EBAY.APP_ID;
        url += "&siteid=0";
        url += "&version=515";
        url += "&ItemID=" + itemId;
        console.log(req);
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return res.json(JSON.parse(body));
            }
        });
    }


    // function findProductByUserId(req, res) {}
    // function findProductByCatalogId(req, res) {}

    //Functions for our product
    function findProductById(prodId) {
        var deferred = q.defer();
        ProductModel.findById(prodId).then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    function findAllProductsByUserId(userId) {
        var deferred = q.defer();
        ProductModel.find({"merchantId": userId}).then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }


    function findAllProductsByCatalogId(catId) {
        var deferred = q.defer();
        ProductModel.find({"catalogId": catId}).then(function (prod) {
            deferred.resolve(prod);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }


    function findAllProducts() {
        var deferred = q.defer();
        ProductModel.find().then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    // //Accepts parameters user object and callback function
    // //Adds property called _id with unique value to the user object parameter.
    // //Adds the new user to local array of users
    // //Calls back with new user
    function createProduct(userId, prod) {
        var deferred = q.defer();
        prod.merchantId = userId;
        ProductModel.create(prod).then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    // //Accepts parameters user id, user object and callback function
    // //Iterates over the array of current users looking for a user
    // // object whose user id is equal to parameter user id
    // //If found, updates user with new user properties
    // //Calls back with updated user
    function updateProduct(prodId, prod) {
        var deferred = q.defer();
        ProductModel.update({_id: prodId}, prod).then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    // //Accepts parameters user id and callback function
    // //Iterates over the array of current users looking for a
    // // user object whose user id is equal to parameter user id
    // //If found, removes user from the array of current users
    // //Calls back with remaining array of all users
    function deleteProduct(prodId) {
        var deferred = q.defer();
        ProductModel.remove({_id: prodId}).then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    function amazonFindItemsByKeywords(keyword) {
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
                // console.log(I);
                // console.log(I.MediumImage.URL)
                // console.log(I.DetailPageURL)
                // console.log(I.ItemAttributes.Title)
                // console.log(I.ItemAttributes.Feature[0])
                //console.log(items);
                deferred.resolve(mapListingToGluecListing(items, amazon_providerId));
            }
        });
        return deferred.promise;
    }


};