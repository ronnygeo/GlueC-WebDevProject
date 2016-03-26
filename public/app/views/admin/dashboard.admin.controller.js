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

        // Event Handlers
        //Event Handlers
        vm.selectUser = selectUser;
        vm.deleteUser = deleteUser;
        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.toggle = toggle;

        function toggle() {
            vm.type = vm.type === 'PolarArea' ?
                'Pie' : 'PolarArea';
        }

        function addUser() {
            UserService.createUser(vm.user).then(function(data){
                vm.users.push(data.data);
                vm.user = {};
            });
        }

        function updateUser() {
            console.log(vm.user);
            UserService.updateUser(vm.user._id, vm.user).then(function(){
                vm.user = {};
            });
        }

        //Add to the edit boxes.
        function selectUser(index) {
            vm.user = vm.users[index];
        }

        function deleteUser(index) {
            UserService.deleteUserById(vm.users[index]._id).then(function(data){
                vm.users = data.data;
            });
        }

        angular.element(document).ready(function () {
            $('ul.tabs').tabs();
            
        });


        UserService.findAllUsers().then(function (data) {
            vm.users = [];
            vm.users = data.data;
            vm.user = {};
        });

        CatalogService.findAllCatalogs().then(function (data) {
            vm.catalogs = data.data;
            // console.log(data.data);
        })

    }

})();