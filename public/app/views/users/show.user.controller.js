/**
 * Created by ronnygeo on 3/26/16.
 */
(function () {
    angular.module('GluecApp')
        .controller('ShowUserController', ShowUserController);

    ShowUserController.$inject = ['UserService', 'ProductService', '$routeParams', '$rootScope', 'MessageService'];
    function ShowUserController (UserService, ProductService, $routeParams, $rootScope, MessageService) {

        var vm  = this;
        vm.user = {};
        var toUserId = $routeParams.id;
        var fromUserId = $rootScope.user._id;


        angular.element(document).ready(function () {
            $('.modal-trigger').leanModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                in_duration: 300, // Transition in duration
                out_duration: 200, // Transition out duration
                ready: function() {
                    vm.message = {};
                    vm.message.from = fromUserId;
                    vm.message.subject = "";
                    vm.message.to = toUserId;
                }, // Callback for Modal open
                complete: function() {
                    MessageService.createMessage(toUserId, vm.message).then(function(data) {
                    });} // Callback for Modal close
            });
        });

        UserService.findUserById(toUserId).then(function (data) {
            vm.user = data.data;
            // console.log(vm.user);

            if (vm.user.roles.indexOf('merchant') !== -1) {
                ProductService.findAllProductsByUserId(toUserId).then(function (data) {
                    vm.user.products = data.data;
                });
            }
        });
    }
})();
