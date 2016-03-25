/**
 * Created by ronnygeo on 3/6/16.
 */

(function (){

    angular.module("GluecApp")
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$rootScope', 'CatalogService', 'ProductService'];
    function DashboardController($rootScope, CatalogService, ProductService) {
        var vm = this;
        var userId = $rootScope.user._id;
        CatalogService.findAllCatalogsByUser(userId).then(function (data) {
            vm.catalogs = data.data;
        });

        vm.goToCatalog = goToCatalog;

        function goToCatalog(catId) {
            $location.url("/api/user/"+userId+"/catalog/"+catId);
        }

    }

})();