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
            getDirectListingTemplate: getDirectListingTemplate,
            getSimilarListingTemplate: getSimilarListingTemplate,
            external: {
                getProviderListings: getProviderListings,
                getProviderListing: getProviderListing
            }
        };
        return api;

        function getProviderListings(keyword) {
            var url = "/api/listing/external/" + keyword;
            return $http.get(url);
        }

        function getProviderListing(providerId, productId) {
            var url = "/api/listing/external/" + providerId + "/" + productId;
            console.log("Getting Single Item from " + url);
            return $http.get(url);
        }


        function getDirectListingTemplate(listing) {
            console.log("Calling Server getDirectListingTemplate");
            console.log(listing);
            var url = "/api/listing/template/direct";
            return $http.post(url, listing);
        }

        function getSimilarListingTemplate(listing) {
            console.log("Calling Server getSimilarListingTemplate");
            console.log(listing);
            var url = "/api/listing/template/similar";
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
            var flatListing = flat(listing);
            var fd = new FormData();
            for (var key in flatListing) {
                if (flatListing[key]) {
                    fd.append(key, flatListing[key]);
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

        function flat(listing) {
            var flatListing = {};
            flatListing['_id'] = listing._id;
            flatListing['providerId'] = listing.providerId;
            flatListing['selectedParentCategoryId'] = listing.ebay.parentCategoryId;
            flatListing['selectedParentCategoryName'] = listing.ebay.parentCategoryName;
            flatListing['selectedSubCategoryId'] = listing.ebay.subCategoryId;
            flatListing['selectedSubCategoryName'] = listing.ebay.subCategoryName;
            flatListing['image'] = listing.image;
            return flatListing;
        }


    }
})();