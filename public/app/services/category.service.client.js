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
            getTopLevelCategories: getTopLevelCategories,
            getSubCategories: getSubCategories,
            getDetailsForCategory: getDetailsForCategory
        };
        return api;

        function getSubCategories(providerId, parentCategoryId) {
            console.log("Calling Server getSubCategories");
            var url = "/api/getSubCategories/" + providerId + "/" + parentCategoryId;
            console.log(url);
            return $http.get(url);
        }

        function getTopLevelCategories(providerId) {
            console.log("Calling Server getTopLevelCategories");
            var url = "/api/getTopLevelCategories/" + providerId;
            return $http.get(url);
        }

        function getDetailsForCategory(providerId, subCatergoryId) {
            console.log("Calling Server getDetailsForCategory");
            var url = "/api/getDetailsForCategory/" + providerId + "/" + subCatergoryId;
            return $http.get(url);
        }
    }
})();