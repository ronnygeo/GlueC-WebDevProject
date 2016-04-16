/**
 * Created by Bhanu on 04/15/2016.
 */

"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller("SellController", SellController);

    SellController.$inject = ['ProductService', '$scope', '$routeParams', '$location', 'ProgressBarFactory'];

    function SellController(ProductService, $scope, $routeParams, $location, ProgressBarFactory) {

        var SellController = this;

        function init() {

        }

        init();

    }
})();