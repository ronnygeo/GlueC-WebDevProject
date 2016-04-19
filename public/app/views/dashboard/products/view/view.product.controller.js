(function () {
    angular.module('GluecApp')
        .controller('ViewProductController', ViewProductController);

    ViewProductController.$inject = ['ProductService', '$route'];

    function ViewProductController(ProductService, $route) {
        var vm = this;
        var prodId = $route.current.params.prodId;
        
        ProductService.findProductById(prodId).then(function (data) {
            // console.log(data.data);
            vm.product = data.data;
        });
    }

})();