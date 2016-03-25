/**
 * Created by Bhanu on 03/03/2016.
 */

"use strict";
(function () {
    angular
        .module("GluecApp")
        .factory("ProductService", ProductService);

    ProductService.$inject = ['$http'];

    function ProductService($http) {

        var api = {
            findItemsAdvanced: findItemsAdvanced,
            getSingleItem: getSingleItem
        };
        return api;

        function getSingleItem(providerId, productId) {
            var url = "/api/getSingleItem/" + providerId + "/" + productId;
            console.log("Getting Single Item from "+url);
            return $http.get(url);
        }

        function findItemsAdvanced(keyword) {
            var url = "/api/getItems/" + keyword;
            return $http.get(url);
        }

    }
})();