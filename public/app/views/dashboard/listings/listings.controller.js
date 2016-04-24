(function () {
    "use strict";
    angular
        .module('GluecApp')
        .controller("ListingController", ListingController);

    ListingController.$inject = ['ListingService', '$rootScope', '$location'];

    function ListingController(ListingService, $rootScope, $location) {

        var ListingController = this;
        ListingController.deleteListing = deleteListing;

        function init() {
            getAllListingsForUser();
        }

        init();

        function getAllListingsForUser() {
            ListingService.getAllListingsForUser($rootScope.user._id)
                .then(function (response) {
                        console.log(response.data);
                        ListingController.listings = response.data;
                    }, function (err) {
                        console.log(err);
                    }
                )
        }

        function deleteListing(listingId) {
            console.log("deleteListing");
            if (!listingId) {
                return
            }
            ListingService.deleteListing(listingId)
                .then(function (response) {
                        console.log(response.data);
                        for (var i in ListingController.listings) {
                            if (ListingController.listings[i]._id == listingId)
                                ListingController.listings.splice(i, 1);
                        }
                    }, function (err) {
                        console.log(err);
                    }
                )
        }
    }
})();