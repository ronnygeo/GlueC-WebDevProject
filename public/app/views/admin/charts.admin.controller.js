/**
 * Created by ronnygeo on 4/15/16.
 */
(function () {
    angular.module('GluecApp')
        .controller("DoughnutCtrl", DoughnutCtrl);

    DoughnutCtrl.$inject = ['ProductService', 'CatalogService', 'UserService', '$rootScope'];
    function DoughnutCtrl(ProductService, CatalogService, UserService) {
        var vm = this;
        vm.labels = ["Total Users", "Total Catalogs", "Total Products"];
        vm.data = [1, 2, 3];
        var user = $rootScope.user;
        var userId = user._id;

        if (user.roles.indexOf('admin') != -1) {
            UserService.findAllUsers().then(function (data) {
                vm.data[0] = data.data.length;
            });

        CatalogService.findAllCatalogs().then(function (data) {
            vm.data[1] = data.data.length;
        });

        ProductService.findAllProducts().then(function (data) {
            vm.data[2] = data.data.length;
        });
        }
        else if (user.roles.indexOf('merchant') != -1) {
            vm.labels = ["Total Catalogs", "Total Products", "Views"];
            vm.data = [20, 10, 500];
            CatalogService.findAllCatalogsByUser(userId).then(function (data) {
                vm.data[0] = data.data.length;
            });

            ProductService.findAllProductsByUserId(userId).then(function (data) {
                vm.data[1] = data.data.length;
            });
        } else {
            vm.labels = ["Purchased", "Wish list", "Gifts"];
            vm.data = [20, 10, 5];
            // CatalogService.findAllCatalogs().then(function (data) {
            //     vm.data[1] = data.data.length;
            // });
            //
            // ProductService.findAllProducts().then(function (data) {
            //     vm.data[2] = data.data.length;
            // });
        }
    }
})();