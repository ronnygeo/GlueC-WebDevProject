(function () {
    angular.module('GluecApp')
        .controller('ViewListingController', ViewListingController);

    ViewListingController.$inject = ['ListingService', '$route', '$rootScope', '$location'];

    function ViewListingController(ListingService, $route, $rootScope, $location) {
        var ViewListingController = this;
        ViewListingController.deleteListing = deleteListing;
        var listingId = $route.current.params.listingId;

        function init() {
            loadListing();
        }

        init();

        function loadListing() {
            ListingService.findListingById(listingId)
                .then(function (response) {
                    console.log(response.data);
                    ViewListingController.listing = response.data;
                }, function (err) {
                    console.log(err);
                });
        }

        function deleteListing(listingId) {
            console.log("deleteProduct");
            ListingService.deleteListing(listingId)
                .then(function () {
                    $location.url("/dashboard/listings/");
                }, function (err) {
                    console.log(err);
                });
        }
    }

})();