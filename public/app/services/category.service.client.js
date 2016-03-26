/**
 * Created by Bhanu on 26/03/2016.
 */

"use strict";
(function () {

    angular
        .module("GluecApp")
        .factory("CategoryService", CategoryService);

    CategoryService.$inject = ['$http'];
    function CategoryService($http) {

        var api = {
                getTopLevelCategories: getTopLevelCategories
        };
        return api;


        function getTopLevelCategories(prviderId) {
            console.log("Calling Server Service");
            var url = "/api/getTopLevelCategories/" + prviderId;
            return $http.get(url);
        }
    }
})();