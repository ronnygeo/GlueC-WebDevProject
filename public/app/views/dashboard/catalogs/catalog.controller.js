/**
 * Created by ronnygeo on 3/25/16.
 */

(function () {
    "use strict";
    angular
        .module('GluecApp')
        .controller("CatalogController", CatalogController);

    CatalogController.$inject = ['CatalogService', '$rootScope', '$location'];

    function CatalogController(CatalogService, $rootScope, $location) {

        //$scope.search = search;
        var vm = this;
        vm.$location = $location;
        var userId = $rootScope.user._id;
        //var catId = $routeParams.catId;

        vm.selectedcat = {};

        CatalogService.findAllCatalogsByUser(userId).then(function (res) {
            vm.catalogs = res.data;
        });

        vm.createCatalog = createCatalog;
        vm.deleteCatalog = deleteCatalog;
        vm.goToUpdate = goToUpdate;
        vm.goToCreate = goToCreate;

        function createCatalog() {
            CatalogService.createCatalog(userId).then(function (data) {
                vm.catalogs = data;
            });
        }

        function goToCreate() {
            $location.url("dashboard" + "/catalog/new");
        }

        function goToUpdate(catalog) {
            // $location.url("/dashboard/catalog/"+catalog._id+"/edit");
        }

        function deleteCatalog(catId) {
            CatalogService.deleteCatalog(userId, catId).then(function () {
                for (var i in vm.catalogs) {
                    if (vm.catalogs[i]._id == catId)
                        vm.catalogs.splice(i, 1);
                }
            });
        }
    }
})();