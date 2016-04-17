(function () {
    angular.module("GluecApp")
        .controller('MessageController', MessageController);

    MessageController.$inject = ['$scope', 'MessageService', '$rootScope', '$timeout', 'UserService'];

    function MessageController($scope, MessageService, $rootScope, $timeout, UserService) {
        var vm = this;
        vm.userId = $rootScope.user._id;
        var fromUserId = $rootScope.user._id;
        vm.message = {};

        vm.reply = reply;
        vm.deleteMessage = deleteMessage;

        function reply(i) {
            vm.message.subject = "Re: "+vm.messages[i].subject;
            vm.message.to = vm.messages[i].from;

            $('#message-modal').openModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                in_duration: 300, // Transition in duration
                out_duration: 200, // Transition out duration
                ready: function() {
                    vm.message.from = fromUserId;
                    vm.message.message = "";
                },
                complete: function() {
                    MessageService.createMessage(vm.message.to, vm.message).then(function(data) {
                    });} // Callback for Modal close);
            });
        }

        function deleteMessage(i) {
            MessageService.deleteMessage(vm.messages[i]._id).then(function () {
                vm.messages.splice(i, 1);
            });
        }

        angular.element(document).ready(function () {
            $('.collapsible').collapsible({
                accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });

            $('.modal-trigger').leanModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                in_duration: 300, // Transition in duration
                out_duration: 200, // Transition out duration
                // ready: function() {
                //     vm.message.from = fromUserId;
                //     vm.message.subject = "";
                //     vm.message.message = "";
                // },
                complete: function() {
                    console.log(vm.message);
                    MessageService.createMessage(vm.message.to, vm.message).then(function(data) {
                    });} // Callback for Modal close
            });

            $timeout(function () {
                $('select').material_select();
            }, 100, false);

        });

        MessageService.findMessagesByUser(fromUserId).then(function (data) {
            vm.messages = data.data;
            for (m in vm.messages) {
                UserService.findUserByIdMinimal(vm.messages[m].from).then(function (data) {
                    // $scope.$apply(function () {
                        vm.messages[m].user = data.data;
                    // });
                });
            }
            console.log(vm.messages);
        });

        UserService.findAllUsers().then(function (data) {
            console.log(data.data);
            vm.users = data.data;
        });
    }
})();