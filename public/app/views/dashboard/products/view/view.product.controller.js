(function () {
    angular.module('GluecApp')
        .controller('ViewProductController', ViewProductController);

    ViewProductController.$inject = ['ProductService', '$routeParams'];

    function ViewProductController(ProductService, $routeParams) {
        var vm = this;
        var prodId = $routeParams.prodId;

        console.log(prodId);

        ProductService.findProductById(prodId).then(function (data) {
            vm.product = data.data;
        });
    }

})();