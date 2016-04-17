/**
 * Created by Bhanu on 04/15/2016.
 */

"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller("SellController", SellController);

    SellController.$inject = ['ProductService', '$scope', '$routeParams', '$location', 'ProgressBarFactory','$timeout'];

    function SellController(ProductService, $scope, $routeParams, $location, ProgressBarFactory,$timeout) {

        var SellController = this;

        SellController.sellImage = sellImage;
        SellController.sellSearch = sellSearch;
        SellController.sellDirect = sellDirect;

        function init() {
            angular.element(document).ready(function () {
                $timeout(function () {
                    $('.slider').slider();
                }, 0, false);
            });
        }

        init();
        function sellDirect() {
            $location.url("/listing/direct/create");
        }

        function sellSearch() {
            console.log("Got KeyEvent Enter");
            $location.url("/search/q/" + SellController.search_input);
        }

        function sellImage() {

        }


    }
})();