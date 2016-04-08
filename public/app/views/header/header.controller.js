/**
 * Created by Bhanu on 02/03/2016.
 */
(function () {
    "use strict";
    angular
        .module("GluecApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, $rootScope) {

        function init() {
            angular.element(document).ready(function () {
                $('.button-collapse').sideNav();
                if ($rootScope.user){
                   $scope.$location = $location;
                }
                });
        }


        init();

        //Event Handler Deceleration
        $scope.logout = logout;
        $scope.goToMessages = goToMessages;

        //Event Handler Implementation
        function logout() {
            delete $rootScope.user;
            $location.url("/login");
        }

        function goToMessages() {
            $location.url('/user/'+$rootScope.user._id+'/messages');
        }
    }
})();