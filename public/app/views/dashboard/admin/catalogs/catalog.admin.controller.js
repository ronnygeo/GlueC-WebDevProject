
(function () {
    "use strict";
    angular
        .module('GluecApp')
        .controller("AdminCatalogController", AdminCatalogController);

    AdminCatalogController.$inject = ['CatalogService', '$rootScope', '$location'];

    function AdminCatalogController(CatalogService, $rootScope, $location) {

        //$scope.search = search;
        var vm = this;
        vm.$location = $location;

        CatalogService.findAllCatalogs().then(function (data) {
            vm.catalogs = data.data;
            vm.catalog = {};
        })

    }
})();