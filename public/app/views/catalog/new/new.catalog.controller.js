/**
 * Created by ronnygeo on 3/25/16.
 */

"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller("NewCatalogController", NewCatalogController);

    NewCatalogController.$inject = ['CatalogService', '$routeParams', '$location'];

    function NewCatalogController(CatalogService, $routeParams, $location) {

        //$scope.search = search;
        var vm = this;
        vm.$location = $location;

        var userId = $routeParams.id;
        console.log(userId);

       vm.createCatalog = createCatalog;

        function createCatalog(){
            console.log(vm.catalog);
            CatalogService.createCatalog(userId, vm.catalog).then(function (data){
                vm.catalogs = data;
            });
       }
    }
})();