/**
 * Created by Bhanu on 25/03/2016.
 */

module.exports = function (q, uuid, request) {

    var products = require('./product.local.test.json');
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
        }
    };

    return api;

    function getSingleItem(itemId) {
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
            "_id": uuid.v1(),
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

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var res = JSON.parse(body);
                if (res.findItemsAdvancedResponse[0] &&
                    res.findItemsAdvancedResponse[0].searchResult[0] &&
                    res.findItemsAdvancedResponse[0].searchResult[0].item) {
                    deferred.resolve(
                        mapFindEbayToGluecProducts(res.findItemsAdvancedResponse[0].searchResult[0].item));
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

    function mapFindEbayToGluecProducts(ebayProducts) {
        var products = [];
        for (var ebayProduct in ebayProducts) {
            products.push(mapFindEbayToGluecProduct(ebayProducts[ebayProduct]))
        }
        return products;
    }

    function mapFindEbayToGluecProduct(ebayProduct) {
        var product = {
            "_id": uuid.v1(),
            //"externalProductId": ebayProduct.productId[0].__value__,
            "externalItemId": ebayProduct.itemId[0],
            "title": ebayProduct.title,
            "name": "",
            "manufacturer": "",
            "description": "",
            "categories": [],
            "price": "",
            "discount": "",
            "providerId": 10001,
            "catalogId": "",
            "merchantId": "",
            "imageUrl": ebayProduct.galleryURL[0],
            "providerUrl": ""

        };
        return product;
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
        var found = 0;
        for(var p in products) {
            // console.log(u);
            if( products[p]._id == prodId ) {
                found = 1;
                deferred.resolve(products[p]);
                break;
            }
        }
        // console.log(found);
        if (found === 0) {
            deferred.reject();
        }
        return deferred.promise;
    }

    function findAllProductsByUserId(userId) {
        var collection = [];
        var deferred = q.defer();
        for (var i in products) {
            if (products[i].merchantId == userId) {
                collection.push(products[i]);
            }
        }
        deferred.resolve(collection);
        //deferred.reject();
        return deferred.promise;
    }


    function findAllProductsByCatalogId(catId) {
        console.log(catId);
        var collection = [];
        var deferred = q.defer();
        for (var i in products) {
            if (products[i].catalogId == catId) {
                collection.push(products[i]);
            }
        }
        deferred.resolve(collection);
        //deferred.reject();
        return deferred.promise;

    }


    function findAllProducts() {
        var deferred = q.defer();
        deferred.resolve(products);
        return deferred.promise;
    }

    // //Accepts parameters user object and callback function
    // //Adds property called _id with unique value to the user object parameter.
    // //Adds the new user to local array of users
    // //Calls back with new user
    function createProduct(userId, data) {
        var deferred = q.defer();
        data._id = uuid.v1();
        data.merchantId = userId;
        if (products.push(data)) {
            deferred.resolve(data);
        } else {
            deferred.reject();
        }
        return deferred.promise;
    }

    // //Accepts parameters user id, user object and callback function
    // //Iterates over the array of current users looking for a user
    // // object whose user id is equal to parameter user id
    // //If found, updates user with new user properties
    // //Calls back with updated user
    function updateProduct(prodId, data) {
        var deferred = q.defer();
        var found = 0;
        for(var p in products) {
            // console.log(u);
            if( products[p]._id == prodId ) {
                product = products[p];
                for (var key in data) {
                    product[key] = data[key];
                }
                found = 1;
                deferred.resolve(product);
                break;
            }
        }

        if (found === 0)
            deferred.reject();
        return deferred.promise;
    }

    // //Accepts parameters user id and callback function
    // //Iterates over the array of current users looking for a
    // // user object whose user id is equal to parameter user id
    // //If found, removes user from the array of current users
    // //Calls back with remaining array of all users
    function deleteProduct(prodId) {
        var deferred = q.defer();
        for (var i = 0; i < products.length; i++){
            if (prodId == products[i]._id)
            {
                products.splice(i, 1);
                break;
            }
        }
        deferred.resolve(products);
        return deferred.promise;
    }





};