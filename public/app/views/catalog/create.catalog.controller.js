/**
 * Created by ronnygeo on 3/25/16.
 */

/**
 * Created by ronnygeo on 3/25/16.
 */

"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller("CreateCatalogController", CreateCatalogController);

    CreateCatalogController.$inject = ['CatalogService', '$scope', '$routeParams', '$location'];

    function CreateCatalogController(CatalogService, $scope, $routeParams, $location) {

        $scope.$location = $location;
        //$scope.search = search;
        var vm = this;
        var userId = $routeParams.id;
        var catId = $routeParams.catId;

        CatalogService.findCatalogById(catId).then(function (res) {
            vm.catalog = res.data;
        });

        vm.createCatalog = createCatalog;

        function createCatalog(){
            CatalogService.createCatalog(userId).then(function (data){
                vm.catalogs = data;
            });
        }

    }
})();