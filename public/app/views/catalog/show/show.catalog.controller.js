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
        .controller("ShowCatalogController", ShowCatalogController);

    ShowCatalogController.$inject = ['CatalogService', '$scope', '$routeParams', '$location'];

    function ShowCatalogController(CatalogService, $scope, $routeParams, $location) {

        $scope.$location = $location;
        //$scope.search = search;
        var vm = this;
        var userId = $routeParams.id;
        var catId = $routeParams.catId;

        CatalogService.findCatalogById(catId).then(function (res) {
            vm.catalog = res.data;
        });

        vm.createCatalog = createCatalog;
        vm.goToUpdate = goToUpdate;
        vm.goToCreate = goToCreate;

        function createCatalog(){
            CatalogService.createCatalog(userId).then(function (data){
                // vm.catalog = data;
                $location.url('user/'+userId+'/catalog/'+catId);
            });
        }

        function goToCreate(userId) {
            $location.url("/user/"+userId+"/catalogz");
        }

        function goToUpdate(catalog) {
            $location.url("/user/"+userId+"/catalog/"+catalog._id+"/edit");
        }

        
    }
})();