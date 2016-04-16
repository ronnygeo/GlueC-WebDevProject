/**
 * Created by ronnygeo on 3/25/16.
 */

(function () {
    "use strict";
    angular
        .module('GluecApp')
        .controller("ListCatalogController", CatalogController);

    CatalogController.$inject = ['CatalogService', '$rootScope', '$routeParams', '$location'];

    function CatalogController(CatalogService, $rootScope, $routeParams, $location) {

        //$scope.search = search;
        var vm = this;
        vm.$location = $location;
        var userId = $rootScope.user._id;
        var catId = $routeParams.catId;

        console.log(userId);
        CatalogService.findAllCatalogsByUser(userId).then(function (res) {
            console.log(res);
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
            $location.url("/dashboard/catalog/"+catalog._id+"/edit");
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