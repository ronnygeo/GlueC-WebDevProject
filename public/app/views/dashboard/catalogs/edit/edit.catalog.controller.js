/**
 * Created by ronnygeo on 3/25/16.
 */

"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller("EditCatalogController", EditCatalogController);

    EditCatalogController.$inject = ['CatalogService', '$routeParams', '$location', '$rootScope', '$timeout'];

    function EditCatalogController(CatalogService, $routeParams, $location, $rootScope, $timeout) {
        //$scope.search = search;
        var vm = this;

        vm.$location = $location;
        vm.categories = $rootScope.catalogCatData;

        var userId = $rootScope.user._id;
        var catId = $routeParams.catId;
        console.log(catId);

        function init() {
            angular.element(document).ready(function () {
                $timeout(function () {
                    $('select').material_select();
                }, 0, false);
            });
            CatalogService.findCatalogById(userId, catId).then(function (res) {
                vm.catalog = res.data;
            });
        }

        init();

        vm.updateCatalog = updateCatalog;

        function updateCatalog() {
            CatalogService.updateCatalog(userId, catId, vm.catalog).then(function (res) {
                for (var i in vm.catalogs) {
                    if (vm.catalogs[i]._id == catId)
                        vm.catalogs[i] = res.data;

                }
            });
            $location.url("/dashboard/catalogs");
        }
    }
})();