/**
 * Created by ronnygeo on 3/26/16.
 */
(function () {
    angular.module('GluecApp')
        .controller('ShowUserController', ShowUserController);

    ShowUserController.$inject = ['UserService', 'ProductService', '$routeParams', '$rootScope', '$uibModal'];
    function ShowUserController (UserService, ProductService, $routeParams, $rootScope, $uibModal) {

        var vm  = this;
        vm.user = {};
        var toUserId = $routeParams.id;

        var fromUserId = $rootScope
        vm.message = {};
        vm.message.from = $rootScope.user._id;
        vm.message.to = userId;


        vm.newMessage = newMessage;
        vm.createMessage = createMessage;

        function newMessage() {
            // $dialog.dialog({}).open('modalContent.html');
            // If the field type is a Single Line of Text the popup should allow users to enter:
            //     Label
            // Placeholder
            // If the field type is a Multi Line Text field, the popup should allow users to enter:
            //     Label
            // Placeholder
            // If the field type is a Dropdown field, the popup should allow users to enter:
            //     Label
            // Options
            // These can be entered in a textarea, one option per line
            // You can use the following format: LABEL:VALUE
            // If the field type is a Checkbox field, the popup should allow users to enter:
            //     Label
            // Options
            // These can be entered in a textarea, one option per line
            // You can use the following format: LABEL:VALUE
            // console.log(field);
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                controller: 'MessageController',
                controllerAs: 'mc',
                templateUrl: './views/forms/dialogContent.html',
                size: 'lg',
                resolve: {
                    message: function (){
                        return message;
                    }
                }
            });

            modalInstance.result.then(function (optionsData){
                if (optionsData) {
                    options = [];
                    opt = optionsData.split('\n');
                    for (var i in opt){
                        o = opt[i];
                        data = o.split(':');
                        label = data[0];
                        value = data[1];
                        options.push({"label": label, "value": value});
                    }
                    field.options = options;
                }

                MessageService.createMessage(user._id, vm.message).then(function (data) {

                });

            });
        }


        function createMessage() {

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
