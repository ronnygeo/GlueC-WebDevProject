(function () {
    angular.module("GluecApp")
        .controller('MessageController', MessageController);

    MessageController.$inject = ['$scope', 'MessageService', '$rootScope', '$timeout', 'UserService'];

    function MessageController($scope, MessageService, $rootScope, $timeout, UserService) {
        var vm = this;
        vm.userId = $rootScope.user._id;
        var fromUserId = $rootScope.user._id;
        vm.message = {};

        vm.newMessage = newMessage;
        vm.reply = reply;
        vm.deleteMessage = deleteMessage;
        vm.send = send;

        function init() {
            angular.element(document).ready(function () {
                $('.collapsible').collapsible({
                    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                });
                $timeout(function () {
                    $('select').material_select();
                }, 100, false);

            });
            MessageService.findMessagesByUser(fromUserId).then(function (data) {
                vm.messages = data.data;
            });

            UserService.findAllUsers().then(function (data) {
                // console.log(data.data);
                vm.users = removeCurrentUser(data.data);
                $('select').material_select('destroy');

            });
        }

        init();

        function removeCurrentUser(users) {
            var filteredUsers = [];
            for (let user of users) {
                if (user._id != $rootScope.user._id) {
                    filteredUsers.push(user);
                }
            }
            return filteredUsers;
        }

        function send() {
            $('#message-modal').closeModal();
            MessageService.createMessage(vm.messageTemp.from, vm.messageTemp)
                .then(function (data) {
                }, function (err) {
                    console.log(err)
                });
        }

        function newMessage() {
            vm.messageTemp = {
                type: 'new',
                from: fromUserId,
                subject: "",
                message: ""
            };
            $('#message-modal').openModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                in_duration: 300, // Transition in duration
                out_duration: 200, // Transition out duration
                ready: function () {
                    angular.element(document).ready(function () {
                        $timeout(function () {
                            $('select').material_select();
                        }, 100, false);
                    });
                } // Callback for Modal open

            });
        }

        function reply(i) {
            console.log("reply index ", i);
            vm.messageTemp = {
                type: 'reply',
                from: fromUserId,
                subject: "Re: " + vm.messages[i].subject,
                message: vm.messages[i].message,
                toUser: vm.messages[i].user.firstName,
                to: vm.messages[i].from
            };
            $('#message-modal').openModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                in_duration: 300, // Transition in duration
                out_duration: 200, // Transition out duration
                ready: function () {
                    angular.element(document).ready(function () {
                        $timeout(function () {
                            $('select').material_select();
                        }, 100, false);
                    });
                } // Callback for Modal open

            });
        }

        function deleteMessage(i) {
            MessageService.deleteMessage(vm.messages[i]._id).then(function () {
                vm.messages.splice(i, 1);
            });
        }

    }
})();