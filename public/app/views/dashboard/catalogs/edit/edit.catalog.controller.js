/**
 * Created by ronnygeo on 3/25/16.
 */

"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller("EditCatalogController", EditCatalogController);

    EditCatalogController.$inject = ['CatalogService', '$route', '$location', '$rootScope','$timeout'];

    function EditCatalogController(CatalogService, $route, $location, $rootScope, $timeout) {
        //$scope.search = search;
        var vm = this;

        vm.$location = $location;
        vm.categories = $rootScope.catalogCatData;

        var userId = $rootScope.user._id;
        //var catId = $routeParams.catId;
        var catId = $route.current.params.catId;
        // console.log(catId);

        vm.catalog = {};

        // if (catId) {
        CatalogService.findCatalogById(userId, catId).then(function (res) {
            vm.catalog = res.data;
        });
        // }

        function init() {
            angular.element(document).ready(function () {
                $timeout(function () {
                    $('select').material_select();
                }, 0, false);
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