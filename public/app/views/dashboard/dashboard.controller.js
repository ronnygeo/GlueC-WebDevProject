/**
 * Created by ronnygeo on 4/15/16.
 */
(function () {
    angular.module('GluecApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$rootScope', 'UserService', 'CatalogService', 'ProductService'];
    function DashboardController($rootScope, UserService, CatalogService, ProductService) {
        var vm = this;
        vm.user = $rootScope.user;
        // var userId = user._id;


    }
})();