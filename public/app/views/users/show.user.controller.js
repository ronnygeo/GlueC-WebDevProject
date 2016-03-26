/**
 * Created by ronnygeo on 3/26/16.
 */
(function () {
    angular.module('GluecApp')
        .controller('ShowUserController', ShowUserController);

    ShowUserController.$inject = ['UserService', 'ProductService', '$routeParams'];
    function ShowUserController (UserService, ProductService, $routeParams) {

        var vm  = this;
        vm.user = {};
        var userId = $routeParams.id;

        UserService.findUserById(userId).then(function (data) {
            vm.user = data.data;

        if (vm.user.roles.indexOf('merchant') !== -1) {
            ProductService.findAllProductsByUserId(userId).then(function (data) {
                vm.user.products = data.data;
            });
        }
        });
    }
})();
