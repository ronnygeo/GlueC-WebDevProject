(function () {
    angular.module('GluecApp')
        .controller('ViewProductController', ViewProductController);

    ViewProductController.$inject = ['ProductService', '$routeParams'];

    function ViewProductController(ProductService, $routeParams) {
        var vm = this;
        var prodId = $routeParams.prodId;
        
        ProductService.findProductById(prodId).then(function (data) {
            console.log(data.data);
            vm.product = data.data;
        });
    }

})();