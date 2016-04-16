/**
 * Created by ronnygeo on 4/15/16.
 */
(function (){

    angular.module('GluecApp')
        .controller('ProductController', ProductController);

    ProductController.$inject = ['ProductService', '$rootScope'];

    function ProductController(ProductService, $rootScope) {
        var vm = this;
        vm.user = $rootScope.user;
        var userId = vm.user._id;

        ProductService.findAllProductsByUserId(userId).then(function (data) {
            console.log(data.data);
            vm.products = data.data;
        });
    }

})();