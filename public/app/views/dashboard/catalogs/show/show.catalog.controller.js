/**
 * Created by ronnygeo on 3/25/16.
 */

"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller("ShowCatalogController", ShowCatalogController);

    ShowCatalogController.$inject = ['ProductService', '$rootScope', '$route'];

    function ShowCatalogController(ProductService, $rootScope, $route) {
        //$scope.search = search;
        var vm = this;
        var catId = $route.current.params.catId;
        console.log(catId);
        ProductService.findAllProductsByCatalogId(catId).then(function (res) {
            console.log(res.data);
            vm.products = res.data;
        });

    }
})();