/**
 * Created by ronnygeo on 4/12/16.
 */
(function () {
"use strict";
    angular.module('GluecApp')
        .controller('EditProductController', EditProductController);

    EditProductController.$inject = ['ProductService', '$location', '$routeParams', 'CatalogService', '$timeout', '$rootScope', 'Upload'];

    function EditProductController(ProductService, $location, $routeParams, CatalogService, $timeout, $rootScope, Upload) {

        var vm = this;
        var prodId = $routeParams.prodId;
        var userId = $rootScope.user._id;

        ProductService.findProductById(prodId).then(function (res) {
            vm.product = res.data;
        });

        CatalogService.findAllCatalogsByUser(userId).then(function (data) {
            vm.catalogs = data.data;
            vm.catalogs.push({_id: userId, name: "Default Catalog"});
            $('select').material_select('destroy');
        });

        function init() {
            angular.element(document).ready(function () {
                $timeout(function () {
                    $('select').material_select();
                }, 100, false);
            });
        }

        init();


        vm.updateProduct = updateProduct;

        function updateProduct() {
            if (vm.product.image) {
                console.log('Image Upload');
                Upload.upload({
                    url: '/api/product/upload', //webAPI exposed to upload the file
                    data:{file:vm.product.image} //pass file as data, should be user ng-model
                }).then(function (res) { //upload function returns a promise
                    if (res.data.error_code !== 1) { //validate success
                        vm.product.imageUrl = '/media/images/products/'+res.data;
                        ProductService.updateProduct(vm.product.merchantId, vm.product._id, vm.product).then(function () {
                            $location.url('/dashboard/products');
                        });
                    } else {
                        console.log('an error occurred');
                    }
                });
            } else {
                ProductService.updateProduct(vm.product.merchantId, vm.product._id, vm.product).then(function () {
                    $location.url('/dashboard/products');
                });
            }

        }
    }
})();