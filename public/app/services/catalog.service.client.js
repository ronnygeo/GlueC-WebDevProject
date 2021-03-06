/**
 * Created by ronnygeo on 3/25/16.
 */

"use strict";
(function () {
    angular
        .module("GluecApp")
        .factory("CatalogService", CatalogService);

    CatalogService.$inject = ['$http'];

    function CatalogService($http) {

        var api = {
            findAllCatalogsByUser: findAllCatalogsByUser,
            findCatalogById: findCatalogById,
            findAllCatalogs: findAllCatalogs,
            createCatalog: createCatalog,
            deleteCatalog: deleteCatalog,
            updateCatalog: updateCatalog,
            getSubCategoriesForCatalog: getSubCategoriesForCatalog

        };
        return api;

        function getSubCategoriesForCatalog(userId, catId) {
            console.log("getSubCategoriesForCatalog");
            var url = "/api/user/" + userId + "/catalog/" + catId + "/subcategories";
            console.log(url);
            return $http.get(url);
        }

        function findCatalogById(userId, catId) {
            return $http.get("/api/user/" + userId + "/catalog/" + catId + "/");
        }

        //Accepts parameters username, password, and callback function
        //Iterates over the array of current users looking for user object
        // whose username and password match the parameters
        //Calls bac k with user found or null otherwise
        function findAllCatalogsByUser(userId) {
            return $http.get("/api/user/" + userId + "/catalogs");
        }

        //findAllUsers(callback)
        //Accepts parameter callback function
        //Calls back with array of all u
        function findAllCatalogs() {
            return $http.get("/api/catalogs");
        }

        //Accepts parameters user object and callback function
        //Adds property called _id with unique value to the user object parameter.
        //Adds the new user to local array of users
        //Calls back with new user
        function createCatalog(userId, catalog) {
            // console.log(userId);
            return $http.post("/api/user/" + userId + "/catalog", catalog);
        }

        //Accepts parameters user id and callback function
        //Iterates over the array of current users looking for a
        // user object whose user id is equal to parameter user id
        //If found, removes user from the array of current users
        //Calls back with remaining array of all users
        function deleteCatalog(userId, catId) {
            return $http.delete("/api/user/" + userId + "/catalog/" + catId);
        }

        //Accepts parameters user id, user object and callback function
        //Iterates over the array of current users looking for a user
        // object whose user id is equal to parameter user id
        //If found, updates user with new user properties
        //Calls back with updated user
        function updateCatalog(userId, catId, catalog) {
            // console.log(userId, catId, catalog);
            return $http.put("/api/user/" + userId + "/catalog/" + catId, catalog);
        }
    }
})();