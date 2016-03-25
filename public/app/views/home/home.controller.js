/**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller('HomeController', HomeController);

    function HomeController(ProductService, $location, $scope, $rootScope, ngProgressFactory) {

        var HomeController = this;

        function init() {

            $("#search").focus();
        }

        init();

        HomeController.search = search;

        function search() {
            console.log("Got KeyEvent Enter");
            $location.url("/search/q/" + HomeController.search_input);
        }

    }
})();