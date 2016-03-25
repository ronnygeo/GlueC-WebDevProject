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

        function getSingleItem(provider, itemId) {
            var url = "/api/getSingleItem/" + provider + "/" + itemId;
            return $http.get(url);
        }

        function findItemsAdvanced(keyword) {
            var url = "/api/getItems/" + keyword;
            return $http.get(url);
        }

    }
})();