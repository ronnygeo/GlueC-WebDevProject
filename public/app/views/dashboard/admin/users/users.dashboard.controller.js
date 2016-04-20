/**
 * Created by ronnygeo on 4/15/16.
 */
(function () {
    angular.module('GluecApp')
        .controller('DashboardUserController', DashboardUserController);
    
    DashboardUserController.$inject = ['UserService', '$rootScope'];

    function DashboardUserController(UserService, $rootScope) {
        var vm = this;

        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.deleteUser = deleteUser;

        angular.element(document).ready(function () {
                $('select').material_select();
        });

        UserService.findAllUsersAdmin().then(function (data) {
            vm.users = [];
            vm.users = data.data;
            vm.user = {};
        });

        function addUser() {
            if (vm.user.roles) {
                vm.user.roles = vm.user.roles.split(',')
            }
            UserService.createUser(vm.user).then(function(data){
                vm.users.push(data.data);
                vm.user = {};
            });
        }

        function updateUser() {
            // console.log(vm.user);
            if (vm.user.roles && !Array.isArray(vm.user.roles)) {
                vm.user.roles = vm.user.roles.split(',')
            }
            UserService.updateUser(vm.user._id, vm.user).then(function(){
                vm.user = {};
            });
        }

        //Add to the edit boxes.
        function selectUser(index) {
            console.log(index);
            vm.user = vm.users[index];
        }

        function deleteUser(index) {
            UserService.deleteUserById(vm.users[index]._id).then(function(data){
                vm.users = data.data;
            });
        }
    }

})();