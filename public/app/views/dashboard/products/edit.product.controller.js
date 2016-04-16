/**
 * Created by ronnygeo on 4/12/16.
 */
(function () {
"use strict";
    angular.module('GluecApp')
        .controller('EditProductController', EditProductController);

    EditProductController.$inject = ['ProductService', '$location', '$routeParams'];

    function EditProductController(ProductService, $location, $routeParams) {

        var vm = this;
        var prodId = $routeParams.prodId;

        ProductService.findProductById(prodId).then(function (res) {
            vm.product = res.data;
        });

        vm.updateProduct = updateProduct;

        function updateProduct() {
            ProductService.updateProduct(vm.product.merchantId, vm.product._id, vm.product).then(function () {
                $location.url('/dashboard');
            });
        }
    }
})();