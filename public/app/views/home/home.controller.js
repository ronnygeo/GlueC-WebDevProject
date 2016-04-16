/**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller('HomeController', HomeController);

    function HomeController(ProductService, $location, $scope, $rootScope, ngProgressFactory) {

        var vm = this;

        function init() {

            $("#search").focus();
        }

        init();

        vm.search = search;
        vm.isLoggedIn = isLoggedIn

        function search() {
            console.log("Got KeyEvent Enter");
            $location.url("/search/q/" + vm.search_input);
        }

        function isLoggedIn() {
            // console.log($rootScope.user);
            if ($rootScope.user == 'undefined') {
                return false;
            } else {
                return true;
            }
        }

    }
})();