/**
 * Created by ronnygeo on 4/13/16.
 */
(function () {
    angular.module("GluecApp")
        .controller("InteractiveListingController", InteractiveListingController);

    InteractiveListingController.$inject = ['ProductService', 'ProgressBarFactory'];

    function InteractiveListingController(ProductService, ProgressBarFactory) {
        var vm = this;

        vm.initial = {};

        vm.createListing = createListing();

        function createListing() {
            ProgressBarFactory.showProgressBar();

            ProductService
                .findItemsAdvanced(vm.query)
                .then(function(data){
                    vm.initial = data.data;
                    ProgressBarFactory.hideProgressBar();
                });
        }

    }
})();