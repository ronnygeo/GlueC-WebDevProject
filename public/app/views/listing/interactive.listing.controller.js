/**
 * Created by ronnygeo on 4/13/16.
 */
(function () {
    angular.module("GluecApp")
        .controller("InteractiveListingController", InteractiveListingController);

    InteractiveListingController.$inject = ['ProductService', 'ProgressBarFactory'];

    function InteractiveListingController(ProductService, ProgressBarFactory) {
        var vm = this;
        
        vm.createListing = createListing;
        vm.uploadImage = uploadImage;

        function createListing() {
            ProgressBarFactory.showProgressBar();

            ProductService
                .findItemsAdvanced(vm.query)
                .then(function(data){
                    vm.product = data.data[0];
                    vm.product.title = vm.query;
                    console.log(vm.product);
                    ProgressBarFactory.hideProgressBar();
                });
        }

        function uploadImage(image) {
            console.log(image);
            $scope.$apply();
        }
        
    }
})();