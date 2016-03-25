/**
 * Created by ronnygeo on 3/25/16.
 */

"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller("CatalogController", CatalogController);

    CatalogController.$inject = ['CatalogService', '$scope', '$routeParams', '$location'];

    function CatalogController(CatalogService, $scope, $routeParams, $location) {

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
        vm.goToUpdate = goToUpdate;
        vm.goToCreate = goToCreate;

        function createCatalog(){
            CatalogService.createCatalog(userId).then(function (data){
                vm.catalogs = data;
            });
        }

        function goToCreate(userId) {
            $location.url("/user/"+userId+"/catalogz");
        }

        function goToUpdate(catalog) {
            $location.url("/user/"+userId+"/catalog/"+catalog._id+"/edit");
        }

        function updateCatalog(catId){
            CatalogService.updateCatalog(userId, catId).then(function (res) {
                for (var i in vm.catalogs){
                    if (vm.catalogs[i]._id == catId)
                        vm.catalogs[i] = res.data;

                }
                vm.catalog = null;
            })
        }
        function deleteCatalog(catId){
            CatalogService.deleteCatalog(userId, catId).then(function (data){
                for (var i in vm.catalogs) {
                    if (vm.catalogs[i]._id == catId)
                        delete vm.catalogs[i];
                }
            });
        }

    }
})();