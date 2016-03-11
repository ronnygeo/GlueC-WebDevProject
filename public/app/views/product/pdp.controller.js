/**
 * Created by Bhanu on 04/03/2016.
 */
'use strict';
(function () {
    angular.module("GluecApp")
        .controller('PDPController', PDPController);

    //PDPController.$inject = ['$scope', '$routeParams'];
    function PDPController(EbayService, $scope, $routeParams,$location) {

        $scope.$location = $location;
        //$scope.getProducById = getProducById;

        var vm = this;
        var productId = $routeParams.productId;

        function init(){
            getProductById();
        }init();

        function getProductById(){
            if(productId  && productId != ""){
                EbayService
                    .findItemsByProduct(productId)
                    .then(render);
            }
            function render(response){
                console.log(response.data);
            }
        }

    }

})();