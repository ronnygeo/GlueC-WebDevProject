/**
 * Created by ronnygeo on 4/19/16.
 */

(function () {

    angular.module('GluecApp')
        .controller('AdminProductController', AdminProductController);

    AdminProductController.$inject = ['ProductService', '$rootScope', '$location'];

    function AdminProductController(ProductService, $rootScope, $location) {
        var vm = this;
        vm.user = $rootScope.user;
        var userId = vm.user._id;

        ProductService.findAllProducts().then(function (data) {
            vm.products = data.data;
            vm.product = {};
            // console.log(data.data);
        });

    }
})();
