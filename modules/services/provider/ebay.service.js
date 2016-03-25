module.exports = function (app, request) {

    app.get("/api/getSingleItem/:itemId", getEbayItem);

    var APP_ID = "BhanuJai-Gluec-PRD-d38ccaf50-a1104f30";
    var FIND_API = "http://svcs.ebay.com/services/search/FindingService/v1";
    var SHOPPING_API = "http://open.api.ebay.com/shoppin" +
        "g";
    var api = {
        findItemsByKeywords: findItemsByKeywords,
        findItemsAdvanced: findItemsAdvanced,
        findItemsByProduct: findItemsByProduct,
        getSingleItem: getSingleItem
    };
    return api;

    function getSingleItem(itemId) {
        var url = SHOPPING_API;
        url += "?callName=GetSingleItem";
        url += "&responseencoding=JSON";
        url += "&appid=" + APP_ID;
        url += "&siteid=0";
        url += "&version=961";
        url += "&ItemID=" + itemId;
        //url += "&format=jsonp";
        //url += "&json_callback=JSON_CALLBACK";
        return $http.get("/api/getSingleItem/"+itemId);
    }

    function findItemsByKeywords(keyword) {
        var url = FIND_API;
        url += "?OPERATION-NAME=findItemsByKeywords";
        url += "&SERVICE-VERSION=1.0.0";
        url += "&SECURITY-APPNAME=" + APP_ID;
        url += "&GLOBAL-ID=EBAY-US";
        url += "&RESPONSE-DATA-FORMAT=JSON";
        url += "&callback=JSON_CALLBACK";
        url += "&REST-PAYLOAD";
        url += "&keywords=" + keyword;
        url += "&paginationInput.entriesPerPage=40";
        return $http.jsonp(url);
    }

    function findItemsAdvanced(keyword) {
        var url = FIND_API;
        url += "?OPERATION-NAME=findItemsAdvanced";
        url += "&SERVICE-VERSION=1.0.0";
        url += "&SECURITY-APPNAME=" + APP_ID;
        url += "&GLOBAL-ID=EBAY-US";
        url += "&RESPONSE-DATA-FORMAT=JSON";
        url += "&callback=JSON_CALLBACK";
        url += "&REST-PAYLOAD";
        url += "&keywords=" + keyword;
        url += "&paginationInput.entriesPerPage=80";
        return $http.jsonp(url);
    }

    function findItemsByProduct(productId, callback) {
        var url = FIND_API;
        url += "?OPERATION-NAME=findItemsByProduct";
        url += "&SERVICE-VERSION=1.0.0";
        url += "&SECURITY-APPNAME=" + APP_ID;
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
        var APP_ID = "BhanuJai-Gluec-PRD-d38ccaf50-a1104f30";
        var SHOPPING_API = "http://open.api.ebay.com/shopping";
        var url = SHOPPING_API;
        url += "?callName=GetSingleItem";
        url += "&responseencoding=JSON";
        url += "&appid=" + APP_ID;
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
};
