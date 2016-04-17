/**
 * Created by Bhanu on 04/03/2016.
 */
'use strict';
(function () {
    angular.module("GluecApp")
        .controller('PDPController', PDPController);

    PDPController.$inject = ['ProductService', '$scope', '$routeParams', '$location', 'ProgressBarFactory'];
    function PDPController(ProductService, $scope, $routeParams, $location, ProgressBarFactory) {

        $scope.$location = $location;
        var PDPController = this;

        function init() {
            getProductById();
        }

        init();

        function getProductById() {
            var productId = $routeParams.productId;
            var providerId = $routeParams.providerId;
            if (!productId || !providerId) {
                return;
            }
            ProgressBarFactory.showProgressBar();
            ProductService
                .getSingleItem(providerId, productId)
                .then(success_callback, error_callback);

            function success_callback(response) {
                ProgressBarFactory.hideProgressBar();
                console.log(response.data);
                PDPController.product = response.data;

            }

            function error_callback(error) {
                ProgressBarFactory.hideProgressBar();
                console.log(error);
                ProgressBarFactory.hideProgressBar();

            }
        }

    }

})();