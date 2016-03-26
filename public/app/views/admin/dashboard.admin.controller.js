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

        vm.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
        vm.data = [300, 500, 100, 40, 120];
        vm.type = 'PolarArea';

        vm.toggle = toggle;

        function toggle() {
            vm.type = vm.type === 'PolarArea' ?
                'Pie' : 'PolarArea';
        };

        angular.element(document).ready(function () {
            $('ul.tabs').tabs();
            
        });


        UserService.findAllUsers().then(function (data) {
            vm.users = data.data;
        });

        CatalogService.findAllCatalogs().then(function (data) {
            vm.catalogs = data.data;
            // console.log(data.data);
        })

    }

})();