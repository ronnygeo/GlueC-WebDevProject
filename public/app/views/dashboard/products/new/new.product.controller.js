/**
 * Created by ronnygeo on 3/26/16.
 */

(function () {
    angular.module('GluecApp')
        .controller('NewProductController', NewProductController);

    NewProductController.$inject = ['ProductService', '$rootScope','$location', '$routeParams', 'CatalogService', '$timeout'];

    function NewProductController(ProductService, $rootScope, $location, $routeParams, CatalogService, $timeout) {
        var userId = $rootScope.user._id;
        console.log(userId);

        // if ($routeParams.catId) {
        //     var catId = $routeParams.catId;
        // }

        var vm = this;
        vm.product = {};
        vm.createProduct = createProduct;

        vm.product.merchantId = userId;

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

        vm.product.catalogId = userId+"default";
        //Handling multiple routes. With and without catId in the path.
        // if (catId){
        //     vm.product.catalogId = catId;
        // }
        // else {
        //     vm.product.catalogId = userId+"default";
        // }

        function createProduct() {
            // console.log(vm.product);
            if (vm.product.imageUrl == undefined) {
                vm.product.imageUrl = '/media/placeholder-new-listing-image.png';
            }
        ProductService.createProduct(userId, vm.product).then(function (data) {
            $location.url('/dashboard/products');
        });
        }
    }
})();