/**
 * Created by ronnygeo on 4/12/16.
 */
(function () {
    "use strict";
    angular.module('GluecApp')
        .controller('EditProductController', EditProductController);

    EditProductController.$inject = ['ProductService', '$location', '$route', 'CatalogService', '$timeout', '$rootScope', 'Upload'];

    function EditProductController(ProductService, $location, $route, CatalogService, $timeout, $rootScope, Upload) {

        var vm = this;
        vm.updateProduct = updateProduct;
        vm.getSubCategories = getSubCategories;
        var prodId = $route.current.params.prodId;
        var userId = $rootScope.user._id;

        function init() {
            if (prodId) {
                ProductService.findProductById(prodId).then(function (res) {
                    vm.product = res.data;
                    getCatalogs();
                    getSubCategories(vm.product.catalogId);
                    angular.element(document).ready(function () {
                        $timeout(function () {
                            $('select').material_select();
                        }, 100, false);
                    });
                });
            }
        }

        init();


        function getCatalogs() {
            CatalogService.findAllCatalogsByUser(userId).then(function (data) {
                vm.catalogs = [];
                vm.catalogs = data.data;
                vm.catalogs.push({_id: userId, name: "Default Catalog"});
                $('select').material_select('destroy');
            });
        }


        function updateProduct() {
            if (vm.product.image) {
                // console.log('Image Upload');
                Upload.upload({
                    url: '/api/product/upload', //webAPI exposed to upload the file
                    data: {file: vm.product.image} //pass file as data, should be user ng-model
                }).then(function (res) { //upload function returns a promise
                    if (res.data.error_code !== 1) { //validate success
                        vm.product.imageUrl = res.data;
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

        function getSubCategories(catId) {
            CatalogService
                .getSubCategoriesForCatalog($rootScope.user._id, catId)
                .then(success_callback, error_callback);
            function success_callback(response) {
                console.log(response.data);
                vm.subcategories = response.data;
                angular.element(document).ready(function () {
                    $timeout(function () {
                        $('select').material_select();
                    }, 100, false);
                });
            }
            function error_callback(error) {
                console.log(error);
            }
        }
    }
})();