/**
 * Created by ronnygeo on 3/8/16.
 */

(function () {
    angular.module("GlueCApp")
        .factory("AmazonService", AmazonService);

    AmazonService.$inject = ['$http'];

    function AmazonService($http) {
        var api = {
            findProduct: findProduct
        };
        return api;

        function findProduct(query) {
            $http.get()
        }
    }
})();