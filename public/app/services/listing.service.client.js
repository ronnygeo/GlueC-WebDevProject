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
            addCategory: addCategory,
            publishListing: publishListing,
            getDirectListingTemplate: getDirectListingTemplate,
            getSimilarListingTemplate: getSimilarListingTemplate,
            getProdListingTemplate: getProdListingTemplate,
            getImageListingTemplate: getImageListingTemplate,
            external: {
                getProviderListings: getProviderListings,
                getProviderListing: getProviderListing
            },
            getAllListingsForUser: getAllListingsForUser,
            deleteListing: deleteListing,
            findListingById: findListingById
        };
        return api;


        function addCategory(listing){
            console.log("Calling Server addCategory");
            console.log(listing);
            var url = "/api/listing/addCategory";
            return $http.post(url, listing);
        }

        function getImageListingTemplate(listing) {
            console.log("Calling Server getImageListingTemplate");
            console.log(listing);
            var url = "/api/listing/template/image";
            var fd = new FormData();
            for (var key in listing) {
                if (listing[key]) {
                    fd.append(key, listing[key]);
                }
            }
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

        function getProdListingTemplate(product) {
            console.log("Calling Server getProdListingTemplate");
            console.log(product);
            var url = "/api/listing/template/prod";
            return $http.post(url, product);
        }

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
            var url = "/api/listing/addDetails/";
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
            flatListing['userId'] = listing.userId;
            flatListing['selectedParentCategoryCode'] = listing.ebay.parentCategory.code;
            flatListing['selectedParentCategoryName'] = listing.ebay.parentCategory.name;
            flatListing['selectedSubCategoryCode'] = listing.ebay.subCategory.code;
            flatListing['selectedSubCategoryName'] = listing.ebay.subCategory.name;
            flatListing['image'] = listing.image;
            if (listing.ebay.description) {
                flatListing['description'] = listing.ebay.subCategoryName;
            }
            if (listing.ebay.price) {
                flatListing['price'] = listing.ebay.price;
            }
            if (listing.ebay.title) {
                flatListing['title'] = listing.ebay.title;
            }
            return flatListing;
        }

        function getAllListingsForUser(userId) {
            console.log("Calling Server getAllListingsForUser");
            console.log(userId);
            var url = "/api/listings/" + userId;
            return $http.get(url);
        }

        function deleteListing(listingId) {
            console.log("Calling Server deleteListing");
            console.log(listingId);
            var url = "/api/listing/" + listingId;
            return $http.delete(url);
        }

        function findListingById(listingId) {
            console.log("Calling Server findListingById");
            console.log(listingId);
            var url = "/api/listing/" + listingId;
            return $http.get(url);
        }


    }
})();