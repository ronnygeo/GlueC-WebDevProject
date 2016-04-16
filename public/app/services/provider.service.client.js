/**
 * Created by Bhanu on 15/04/2016.
 */

"use strict";
(function () {

    angular
        .module("GluecApp")
        .factory("ProviderService", ProviderService);

    ProviderService.$inject = ['$http'];
    function ProviderService($http) {
        var api = {
            getProvidersForUser: getProvidersForUser,
            addProviderForUser: addProviderForUser
        };
        return api;

        function addProviderForUser(provider) {
            console.log("Client addProviderForUser");
            console.log(provider);
            var url = "/api/providers";
            return $http.post(url, provider);
        }

        function getProvidersForUser(userId) {
            console.log("Client getProvidersForUser");
            console.log(userId);
            var url = "/api/providers/" + userId;
            return $http.get(url);
        }

    }
})();