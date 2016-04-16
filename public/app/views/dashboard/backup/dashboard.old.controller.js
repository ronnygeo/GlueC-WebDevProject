/**
 * Created by ronnygeo on 3/6/16.
 */

(function (){

    angular.module("GluecApp")
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$rootScope', 'CatalogService', 'ProductService', '$scope'];
    function DashboardController($rootScope, CatalogService, ProductService, $scope) {
        var vm = this;
        var userId = $rootScope.user._id;

        vm.deleteCatalog = deleteCatalog;

        // angular.element(document).ready(function(){
        //     $('.dropdown-button').dropdown({
        //             inDuration: 300,
        //             outDuration: 225,
        //             constrain_width: false, // Does not change width of dropdown to that of the activator
        //             hover: true, // Activate on hover
        //             gutter: 0, // Spacing from edge
        //             belowOrigin: false, // Displays dropdown below the button
        //             alignment: 'left' // Displays dropdown with edge aligned to the left of button
        //         }
        //     );
        // });

        function deleteCatalog(catId) {
            CatalogService.deleteCatalog(userId, catId).then(function (data) {
                vm.catalogs = data.data;
            });
        }

        CatalogService.findAllCatalogsByUser(userId).then(function (data) {
            vm.catalogs = data.data;
            for (var c in vm.catalogs) {
                //console.log(c);
                ProductService.findAllProductsByCatalogId(vm.catalogs[c]._id).then(function (data) {
                    vm.catalogs[c].products = data.data;
                    //$scope.$apply();
                });
            }
        });

        ProductService.findAllProductsByUserId(userId).then(function (data) {
            vm.products = data.data;
        });

        //View Other Catalogs
        CatalogService.findAllCatalogs().then(function (data) {
            vm.othercatalogs = data.data;
            for (var c in vm.othercatalogs) {
                ProductService.findAllProductsByCatalogId(vm.othercatalogs[c]._id).then(function (data) {
                    console.log(data);
                    vm.othercatalogs[c].products = data.data;
                    });
                }
        });

        ProductService.findAllProducts().then(function (data) {
            vm.otherproducts = data.data;
        })
    }
})();