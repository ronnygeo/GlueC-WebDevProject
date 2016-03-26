/**
 * Created by ronnygeo on 3/26/16.
 */
(function () {
    angular.module('GluecApp')
        .controller('ShowUserController', ShowUserController);

    ShowUserController.$inject = ['UserService', 'ProductService', '$routeParams', '$rootScope'];
    function ShowUserController (UserService, ProductService, $routeParams, $rootScope) {

        var vm  = this;
        vm.user = {};
        var userId = $routeParams.id;

        vm.message = {};
        vm.message.from = $rootScope.user._id;
        vm.message.to = userId;


        vm.newMessage = newMessage;
        vm.createMessage = createMessage;

        function newMessage() {

        }

        function createMessage() {
            MessageService.createMessage(user._id, vm.message).then(function (data) {

            });
        }

        UserService.findUserById(userId).then(function (data) {
            vm.user = data.data;

        if (vm.user.roles.indexOf('merchant') !== -1) {
            ProductService.findAllProductsByUserId(userId).then(function (data) {
                vm.user.products = data.data;
                vm.message.to = vm.user._id;
            });
        }
        });
    }
})();
