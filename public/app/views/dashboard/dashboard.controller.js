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

        vm.deleteCatalog = deleteCatalog;

        function deleteCatalog(catId) {
            CatalogService.deleteCatalog(userId, catId).then(function (data) {
                vm.catalogs = data.data;
            });
        }

        CatalogService.findAllCatalogsByUser(userId).then(function (data) {
            vm.catalogs = data.data;
        });

    }

})();