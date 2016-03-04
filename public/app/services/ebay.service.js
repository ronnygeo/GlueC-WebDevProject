/**
 * Created by Bhanu on 03/03/2016.
 */

"use strict";
(function(){
    angular
        .module("GluecApp")
        .factory("EbayService",EbayService);

    function EbayService($http){

        var APPID = "BhanuJai-Gluec-PRD-d38ccaf50-a1104f30";
        var api ={
            findItemsByKeywords:findItemsByKeywords
        };
        return api;

        function findItemsByKeywords(callback){
            var url = "http://svcs.ebay.com/services/search/FindingService/v1";
            url += "?OPERATION-NAME=findItemsByKeywords";
            url += "&SERVICE-VERSION=1.0.0";
            url += "&SECURITY-APPNAME="+APPID;
            url += "&GLOBAL-ID=EBAY-US";
            url += "&RESPONSE-DATA-FORMAT=JSON";
            url += "&callback=JSON_CALLBACK";
            url += "&REST-PAYLOAD";
            url += "&keywords=harry%20potter";
            url += "&paginationInput.entriesPerPage=3";
            $http.jsonp(url).success(callback);
        };
    };
})();