/**
 * Created by Bhanu on 08/04/2016.
 */

"use strict";
(function () {

    angular
        .module("GluecApp")
        .factory("ListingService", ListingService);

    function ListingService($http) {
        var api = {
            addImageAndCategory: addImageAndCategory,
            publishListing: publishListing,
            getNewListingTemplate: getNewListingTemplate
        };
        return api;

        function getNewListingTemplate(listing) {
            console.log("Calling Server getNewListingTemplate");
            console.log(listing);
            var url = "/api/listing/template";
            return $http.post(url, listing);
        }

        function publishListing(listing) {
            console.log("Calling Server publishListing");
            console.log(listing);
            var url = "/api/listing/publish";
            return $http.post(url, listing);
        }

        function addImageAndCategory(listing) {
            console.log("Calling Server addImageAndCateogry");
            console.log(listing);
            var fd = new FormData();
            for (var key in listing) {
                if (listing[key]) {
                    fd.append(key, listing[key]);
                }
            }
            var url = "/api/listing/";
            console.log(url);
            console.log(fd);
            return $http.post(
                url,
                fd,
                {
                    transformRequest: angular.indentity,
                    headers: {'Content-Type': undefined}
                }
            );
        }

    }


})();