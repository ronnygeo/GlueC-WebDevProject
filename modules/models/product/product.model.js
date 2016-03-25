/**
 * Created by Bhanu on 25/03/2016.
 */

module.exports = function (q, uuid) {

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
        url += "?callName=GetSingleItem";
        url += "&responseencoding=JSON";
        url += "&appid=" + EBAY.APP_ID;
        url += "&siteid=0";
        url += "&version=961";
        url += "&ItemID=" + itemId;
        //url += "&format=jsonp";
        //url += "&json_callback=JSON_CALLBACK";
        return $http.get("/api/getSingleItem/" + itemId);
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
        var url = EBAY.FIND_API;
        url += "?OPERATION-NAME=findItemsAdvanced";
        url += "&SERVICE-VERSION=1.0.0";
        url += "&SECURITY-APPNAME=" + EBAY.APP_ID;
        url += "&GLOBAL-ID=EBAY-US";
        url += "&RESPONSE-DATA-FORMAT=JSON";
        url += "&callback=JSON_CALLBACK";
        url += "&REST-PAYLOAD";
        url += "&keywords=" + keyword;
        url += "&paginationInput.entriesPerPage=80";
        return $http.jsonp(url);
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