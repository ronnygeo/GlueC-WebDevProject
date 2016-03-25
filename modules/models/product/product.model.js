/**
 * Created by Bhanu on 25/03/2016.
 */

module.exports = function (q, uuid, request) {

    var EBAY = {
        APP_ID: "BhanuJai-Gluec-PRD-d38ccaf50-a1104f30",
        FIND_API: "http://svcs.ebay.com/services/search/FindingService/v1",
        SHOPPING_API: "http://open.api.ebay.com/shopping"

    }

    var api = {
        ebay: {
            findItemsByKeywords: findItemsByKeywords,
            findItemsAdvanced: findItemsAdvanced,
            findItemsByProduct: findItemsByProduct,
            getSingleItem: getSingleItem
        }
    };

    return api;

    function getSingleItem(itemId) {
        var url = EBAY.SHOPPING_API;
        var itemId = req.params.itemId;
        var APP_ID = "BhanuJai-Gluec-PRD-d38ccaf50-a1104f30";
        var SHOPPING_API = "http://open.api.ebay.com/shopping";
        var url = SHOPPING_API;
        url += "?callName=GetSingleItem";
        url += "&responseencoding=JSON";
        url += "&appid=" + APP_ID;
        url += "&siteid=0";
        url += "&version=515";
        url += "&ItemID=" + itemId;
        console.log(url);
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return res.json(JSON.parse(body));
            }
        });
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
                        mapEbayToGluecProducts(res.findItemsAdvancedResponse[0].searchResult[0].item));
                } else {
                    console.log("Ebay API Call Failed");
                    deferred.reject("Ebay API Call Failed")
                }
            }else{
                console.log("Ebay API Call Failed");
                deferred.reject("Ebay API Call Failed")
            }
        });

        return deferred.promise;

    }

    function mapEbayToGluecProducts(ebayProducts) {
        var products = [];
        for (var ebayProduct in ebayProducts) {
            products.push(mapEbayToGluecProduct(ebayProducts[ebayProduct]))
        }
        return products;
    }

    function mapEbayToGluecProduct(ebayProduct) {
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
            "imageUrl": ebayProduct.galleryURL[0]
        }
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

}