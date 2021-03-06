/**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller('HomeController', HomeController);

    function HomeController($location, $rootScope, $timeout) {

        var vm = this;

        function init() {
            angular.element(document).ready(function () {
                $timeout(function () {
                    $('.slider').slider();
                }, 0, false);
            });
            $("#search").focus();
        }

        init();

        vm.search = search;
        vm.isLoggedIn = isLoggedIn

        function search() {
            console.log("Got KeyEvent Enter");
            if (!vm.search_input) {
                return;
            }
            $location.url("/search/q/" + vm.search_input);
        }

        function isLoggedIn() {
            if ($rootScope.user == 'undefined') {
                return false;
            } else {
                return true;
            }
        }

    }
})();