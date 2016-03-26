/**
 * Created by ronnygeo on 3/6/16.
 */

(function (){

    angular.module('GluecApp')
        .controller('AdminDashboardController', AdminDashboardController);

    AdminDashboardController.$inject = ['$rootScope', 'UserService', 'CatalogService', 'ProductService'];
    function AdminDashboardController($rootScope, UserService, CatalogService, ProductService) {
        var vm = this;
        var user = $rootScope.user;

        angular.element(document).ready(function () {
            $('ul.tabs').tabs();
            
        });


        UserService.findAllUsers().then(function (data) {
            vm.users = data.data;
        });

        CatalogService.findAllCatalogs().then(function (data) {
            vm.catalogs = data.data;
            console.log(data.data);
        })

    }

})();