(function () {
    angular.module('GluecApp')
        .controller('ShowProductController', ShowProductController);

    ShowProductController.$inject = ['ProductService', '$routeParams'];

    function ShowProductController(ProductService, $routeParams) {
        var vm = this;
        var userId = $routeParams.id;
        var prodId = $routeParams.prodId;
        ProductService.findProductById(prodId).then(function (data) {
            vm.product = data.data;
        });
    }

})();