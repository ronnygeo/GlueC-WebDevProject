(function () {
    angular.module("GluecApp")
        .controller('MessageController', MessageController);

    MessageController.$inject = ['$routeParams', 'MessageService', '$rootScope'];

    function MessageController($routeParams, MessageService, $rootScope) {

        var vm = this;
        var fromUserId = $rootScope.user._id;

        var userId = $routeParams.id;

        angular.element(document).ready(function () {
            $('.collapsible').collapsible({
                accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });

            $('.modal-trigger').leanModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                in_duration: 300, // Transition in duration
                out_duration: 200, // Transition out duration
                ready: function() {
                    vm.message = {};
                    vm.message.from = fromUserId;
                    vm.message.subject = "";
                    vm.message.to = userId;
                }, // Callback for Modal open
                complete: function() {
                    MessageService.createMessage(userId, vm.message).then(function(data) {
                    });} // Callback for Modal close
            });
        });
        MessageService.findMessagesByUser(userId).then(function (data) {
            vm.messages = data.data;
            // console.log(vm.messages);
        });
    }
})();