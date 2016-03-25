/**
 * Created by ronnygeo on 3/25/16.
 */

"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller("EditCatalogController", EditCatalogController);

    EditCatalogController.$inject = ['CatalogService', '$scope', '$routeParams', '$location'];

    function EditCatalogController(CatalogService, $scope, $routeParams, $location) {

        $scope.$location = $location;
        //$scope.search = search;
        var vm = this;
        var userId = $routeParams.id;
        var catId = $routeParams.catId;
        
        CatalogService.findCatalogById(catId).then(function (res) {
            vm.catalog = res.data;
        });

        vm.updateCatalog = updateCatalog;

        function updateCatalog(catId){
            CatalogService.updateCatalog(userId, catId).then(function (res) {
                for (var i in vm.catalogs){
                    if (vm.catalogs[i]._id == catId)
                        vm.catalogs[i] = res.data;

                }
            });
            $location.url("/user/"+userId+"/catalog/"+catId);
        }
    }
})();