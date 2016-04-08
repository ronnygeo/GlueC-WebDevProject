(function () {
    angular.module("GluecApp")
        .controller('MessageController', MessageController);

    MessageController.$inject = ['$routeParams', 'MessageService'];

    function MessageController($routeParams, MessageService) {

        var vm = this;

        var userId = $routeParams.id;

        MessageService.findMessagesByUser(userId).then(function (data) {
            vm.messages = data.data;
            console.log(vm.messages);
        });
    }
})();