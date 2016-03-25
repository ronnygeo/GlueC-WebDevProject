/**
 * Created by ronnygeo on 3/25/16.
 */

"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller("CatalogController", CatalogController);

    CatalogController.$inject = ['CatalogService', '$scope', '$routeParams', '$location', 'ProgressBarFactory'];

    function CatalogController(CatalogService, $scope, $routeParams, $location, ProgressBarFactory) {

        $scope.$location = $location;
        //$scope.search = search;
        var vm = this;
        var userId = $routeParams.id;
        var catId = $routeParams.catId;

        CatalogService.findAllCatalogsByUser(userId).then(function (res) {
            vm.catalogs = res.data;
        });

        vm.createCatalog = createCatalog;
        vm.updateCatalog = updateCatalog;
        vm.deleteCatalog = deleteCatalog;

        function createCatalog(){}
        function updateCatalog(){}
        function deleteCatalog(){}

    }
})();