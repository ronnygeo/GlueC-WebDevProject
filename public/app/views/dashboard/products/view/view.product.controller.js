(function () {
    angular.module('GluecApp')
        .controller('ViewProductController', ViewProductController);

    ViewProductController.$inject = ['ProductService', '$route', '$rootScope', '$location'];

    function ViewProductController(ProductService, $route, $rootScope, $location) {
        var vm = this;
        vm.deleteProduct = deleteProduct;
        vm.createListing = createListing;
        var prodId = $route.current.params.prodId;

        function init() {
            ProductService.findProductById(prodId).then(function (data) {
                // console.log(data.data);
                vm.product = data.data;
            });
        }

        init();

        function createListing(product) {
            console.log("createListing");
            if (!product) {
                return
            }
            $rootScope.prodListing = product;
            $location.url("/listing/create/prod/");
        }

        function deleteProduct(prodId) {
            console.log("deleteProduct");
            ProductService.deleteProduct($rootScope.user._id, prodId).then(function () {
                $location.url("/dashboard/products/");
            });
        }
    }

})();