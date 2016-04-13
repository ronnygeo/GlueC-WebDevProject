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
            for (c in vm.catalogs) {
                console.log(c);
                ProductService.findAllProductsByCatalogId(vm.catalogs[c]._id).then(function (data) {
                    console.log(data.data);
                    vm.catalogs[c].products = data.data;
                    $scope.apply();
                });
            }
        });

        ProductService.findAllProductsByUserId(userId).then(function (data) {
            vm.products = data.data;
        });

        //View Other Catalogs
        CatalogService.findAllCatalogs().then(function (data) {
            vm.othercatalogs = data.data;
            for (c in vm.othercatalogs) {
                ProductService.findAllProductsByCatalogId(vm.othercatalogs[c]._id).then(function (data) {
                    console.log(data.data);
                    vm.othercatalogs[c].products = data.data;
                    $scope.apply();
                });
            }
        });

        ProductService.findAllProducts().then(function (data) {
            vm.otherproducts = data.data;
        })
    }
})();