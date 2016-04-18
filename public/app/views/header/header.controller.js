/**
 * Created by Bhanu on 02/03/2016.
 */
(function () {
    "use strict";
    angular
        .module("GluecApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, $rootScope, UserService) {

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

        //Event Handler Implementation
        function logout() {
            UserService.logout().then(function (){
                delete $rootScope.user;
                $location.url("/login");
            });
        }
    }
})();