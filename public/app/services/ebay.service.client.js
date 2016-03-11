/**
 * Created by Bhanu on 03/03/2016.
 */

"use strict";
(function () {
    angular
        .module("GluecApp")
        .factory("EbayService", EbayService);

    EbayService.$inject = ['$http'];

    function EbayService($http){

        var APP_ID = "BhanuJai-Gluec-PRD-d38ccaf50-a1104f30";
        var FIND_SERVICE = "http://svcs.ebay.com/services/search/FindingService/v1";
        var api ={
            findItemsByKeywords:findItemsByKeywords,
            findItemsAdvanced:findItemsAdvanced,
            findItemsByProduct:findItemsByProduct
        };
        return api;

        function findItemsByKeywords(keyword){
            var url = FIND_SERVICE;
            url += "?OPERATION-NAME=findItemsByKeywords";
            url += "&SERVICE-VERSION=1.0.0";
            url += "&SECURITY-APPNAME="+APP_ID;
            url += "&GLOBAL-ID=EBAY-US";
            url += "&RESPONSE-DATA-FORMAT=JSON";
            url += "&callback=JSON_CALLBACK";
            url += "&REST-PAYLOAD";
            url += "&keywords="+keyword;
            url += "&paginationInput.entriesPerPage=80";
            return $http.jsonp(url);
        };

        function findItemsAdvanced(keyword){
            var url = FIND_SERVICE;
            url += "?OPERATION-NAME=findItemsAdvanced";
            url += "&SERVICE-VERSION=1.0.0";
            url += "&SECURITY-APPNAME="+APP_ID;
            url += "&GLOBAL-ID=EBAY-US";
            url += "&RESPONSE-DATA-FORMAT=JSON";
            url += "&callback=JSON_CALLBACK";
            url += "&REST-PAYLOAD";
            url += "&keywords="+keyword;
            url += "&paginationInput.entriesPerPage=80";
            return $http.jsonp(url);
        };

        function findItemsByProduct(productId, callback){
            var url = FIND_SERVICE;
            url += "?OPERATION-NAME=findItemsByProduct";
            url += "&SERVICE-VERSION=1.0.0";
            url += "&SECURITY-APPNAME="+APP_ID;
            url += "&GLOBAL-ID=EBAY-US";
            url += "&RESPONSE-DATA-FORMAT=JSON";
            url += "&callback=JSON_CALLBACK";
            url += "&REST-PAYLOAD";
            url += "&paginationInput.entriesPerPage=1";
            url += "&productId.@type=ReferenceID";
            url += "&productId="+productId;
            return $http.jsonp(url);
        }
    }
})();