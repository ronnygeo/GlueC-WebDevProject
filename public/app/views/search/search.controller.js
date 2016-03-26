/**
 * Created by Bhanu on 03/03/2016.
 */

"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller("SearchController", SearchController);

    SearchController.$inject = ['ProductService', '$scope', '$routeParams', '$location', 'ProgressBarFactory'];

    function SearchController(ProductService, $scope, $routeParams, $location, ProgressBarFactory) {

        $scope.$location = $location;
        //$scope.search = search;
        var SearchController = this;
        var keyword = $routeParams.keyword;

        function init() {
            search();
        }

        init();

        function search() {
            if (!keyword && keyword == "") {
                return;
            }
            console.log(keyword);
            var inputArray = keyword.split(/[ ,]+/);
            console.log(inputArray);
            if (inputArray[0].toUpperCase() == "BUY") {
                inputArray.splice(0, 1);
                buy(inputArray.join());
            } else if (inputArray[0].toUpperCase() == "SELL") {
                inputArray.splice(0, 1);
                sell(inputArray.join());
            }else{
                buy(keyword);
            }
}

        function sell(keyword) {

        }

        function buy(keyword) {
            console.log(keyword);
            ProgressBarFactory.showProgressBar(keyword);
            ProductService
                .findItemsAdvanced(keyword)
                .then(success_callback, error_callback);
            function success_callback(response) {
                ProgressBarFactory.hideProgressBar();
                console.log(response.data);
                SearchController.products = response.data;
            }

            function error_callback(error) {
                ProgressBarFactory.hideProgressBar();
                console.log("error");
                console.log(error);
            }
        }
    }
})();