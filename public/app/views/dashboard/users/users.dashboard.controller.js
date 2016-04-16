/**
 * Created by ronnygeo on 4/15/16.
 */
(function () {
    angular.module('GluecApp')
        .controller('DashboardUserController', DashboardUserController);
    
    DashboardUserController.$inject = ['UserService', '$rootScope'];

    function DashboardUserController(UserService, $rootScope) {
        var vm = this;
        var user = $rootScope.user;
        var userId = user._id;


        UserService.findAllUsers().then(function (data) {
            vm.users = [];
            vm.users = data.data;
            vm.user = {};
        });

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
    }

})();