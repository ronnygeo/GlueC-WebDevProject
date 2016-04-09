(function () {
    angular.module("GluecApp")
        .controller('MessageController', MessageController);

    MessageController.$inject = ['$routeParams', 'MessageService'];

    function MessageController($routeParams, MessageService) {

        var vm = this;

        var userId = $routeParams.id;

        angular.element(document).ready(function () {
            $('.collapsible').collapsible({
                accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
        });
        MessageService.findMessagesByUser(userId).then(function (data) {
            vm.messages = data.data;
            console.log(vm.messages);
        });
    }
})();