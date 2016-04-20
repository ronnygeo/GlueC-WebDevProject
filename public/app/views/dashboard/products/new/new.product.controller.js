/**
 * Created by ronnygeo on 3/26/16.
 */

(function () {
    angular.module('GluecApp')
        .controller('NewProductController', NewProductController);

    NewProductController.$inject = ['ProductService', '$rootScope', '$location', '$routeParams', 'CatalogService', '$timeout', 'Upload'];

    function NewProductController(ProductService, $rootScope, $location, $routeParams, CatalogService, $timeout, Upload) {
        var userId = $rootScope.user._id;
        // console.log(userId);

        var vm = this;
        vm.product = {};
        vm.createProduct = createProduct;
        vm.getSubCategories = getSubCategories;

        vm.product.merchantId = userId;


        function init() {

            CatalogService.findAllCatalogsByUser(userId).then(function (data) {
                vm.catalogs = data.data;
                vm.catalogs.push({_id: userId, name: "Default Catalog"});
                $('select').material_select('destroy');
            });

            angular.element(document).ready(function () {
                $timeout(function () {
                    $('select').material_select();
                }, 100, false);
            });
        }

        init();

        vm.product.catalogId = userId + "default";
        //Handling multiple routes. With and without catId in the path.
        // if (catId){
        //     vm.product.catalogId = catId;
        // }
        // else {
        //     vm.product.catalogId = userId+"default";
        // }

        function createProduct() {
            console.log(vm.product);
            if (vm.product.image) {
                Upload.upload({
                    url: '/api/product/upload', //webAPI exposed to upload the file
                    data: {file: vm.product.image} //pass file as data, should be user ng-model
                }).then(function (res) { //upload function returns a promise
                    if (res.data.error_code !== 1) { //validate success
                        vm.product.imageUrl = '/media/images/products/' + res.data;
                        ProductService.createProduct(userId, vm.product).then(function () {
                            $location.url('/dashboard/products');
                        });
                    } else {
                        console.log('an error occurred');
                    }
                });
            } else {
                if (vm.product.imageUrl == undefined) {
                    vm.product.imageUrl = '/media/placeholder-new-listing-image.png';
                }
                ProductService.createProduct(userId, vm.product).then(function () {
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