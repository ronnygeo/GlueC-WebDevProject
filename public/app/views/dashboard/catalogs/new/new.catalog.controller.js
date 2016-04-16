/**
 * Created by ronnygeo on 3/25/16.
 */

(function () {
    "use strict";
    angular
        .module('GluecApp')
        .controller("NewCatalogController", NewCatalogController);

    NewCatalogController.$inject = ['CatalogService', '$location', '$rootScope'];

    function NewCatalogController(CatalogService, $location, $rootScope) {

        //$scope.search = search;
        var vm = this;
        vm.$location = $location;
        var userId = $rootScope.user._id;

       vm.createCatalog = createCatalog;

        function createCatalog(){
            vm.catalog.merchantName = $rootScope.user.firstName;
            CatalogService.createCatalog(userId, vm.catalog).then(function (){
                $location.url('/dashboard/catalogs');
            });
       }
    }
})();