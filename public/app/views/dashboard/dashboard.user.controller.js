/**
 * Created by ronnygeo on 4/8/16.
 */

(function () {
    angular.module("GluecApp")
        .controller('UserDashboardController', UserDashboardController);
    
    UserDashboardController.$inject = ['$rootScope','CatalogService', 'ProductService'];
    
    function UserDashboardController($rootScope, CatalogService, ProductService) {
        var vm = this;
        // console.log($rootScope.user);

        CatalogService.findAllCatalogs().then(function (data) {
            vm.catalogs = data.data;
            for (var c in vm.catalogs) {
                ProductService.findAllProductsByCatalogId(vm.catalogs[c]._id).then(function (data) {
                    vm.catalogs[c].products = data.data;
                });
            }
        });

        ProductService.findAllProducts().then(function (data) {
            vm.products = data.data;
        });
    }
})();