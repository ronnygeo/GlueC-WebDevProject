/**
 * Created by ronnygeo on 3/25/16.
 */

(function () {
    "use strict";
    angular
        .module('GluecApp')
        .controller("NewCatalogController", NewCatalogController);

    NewCatalogController.$inject = ['CatalogService', '$location', '$rootScope', '$timeout'];

    function NewCatalogController(CatalogService, $location, $rootScope, $timeout) {

        //$scope.search = search;
        var vm = this;
        vm.$location = $location;
        var userId = $rootScope.user._id;

        vm.categories = $rootScope.catalogCatData;
        vm.createCatalog = createCatalog;

        function init() {
            angular.element(document).ready(function () {
                $timeout(function () {
                    $('select').material_select();
                }, 0, false);
            });
        }

        init();

        function createCatalog() {
            vm.catalog.merchantName = $rootScope.user.firstName;
            var newCatalog = {
                name: vm.catalog.name,
                description: vm.catalog.description,
                parentCategory: {
                    code: vm.catalog.parentCategory._id,
                    name: vm.catalog.parentCategory.name
                }
            };
            console.log(newCatalog);
            CatalogService.createCatalog(userId, newCatalog).then(function () {
                $location.url('/dashboard/catalogs');
            });
        }
    }
})();