/**
 * Created by ronnygeo on 3/26/16.
 */

(function () {
    angular.module('GluecApp')
        .controller('NewProductController', NewProductController);

    NewProductController.$inject = ['ProductService', '$routeParams', '$location'];

    function NewProductController(ProductService, $routeParams, $location) {
        var userId = $routeParams.id;
        console.log(userId);

        if ($routeParams.catId) {
            var catId = $routeParams.catId;
        }

        var vm = this;
        vm.product = {};
        vm.createProduct = createProduct;

        vm.product.merchantId = userId;

        //Handling multiple routes. With and without catId in the path.
        if (catId){
            vm.product.catalogId = catId;
        }
        else {
            vm.product.catalogId = userId+"default";
        }

        function createProduct() {
            console.log(userId);
        ProductService.createProduct(userId, vm.product).then(function (data) {
            $location.url('/dashboard');
        });
        }
    }
})();