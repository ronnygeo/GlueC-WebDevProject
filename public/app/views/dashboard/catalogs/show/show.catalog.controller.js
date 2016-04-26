/**
 * Created by ronnygeo on 3/25/16.
 */

"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller("ShowCatalogController", ShowCatalogController);

    ShowCatalogController.$inject = ['ProductService', '$rootScope', '$route', '$location'];

    function ShowCatalogController(ProductService, $rootScope, $route, $location) {
        //$scope.search = search;
        var vm = this;
        vm.deleteProduct = deleteProduct;
        vm.createListing = createListing;
        var catId = $route.current.params.catId;

        function init() {
            // console.log(catId);
            ProductService.findAllProductsByCatalogId(catId).then(function (res) {
                // console.log(res.data);
                vm.products = res.data;
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