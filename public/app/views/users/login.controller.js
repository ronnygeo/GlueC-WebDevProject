/**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular.module('GluecApp')
        .controller('LoginController', LoginController);

    function LoginController($location, $scope, $rootScope) {

        $scope.$location = $location;
    };


})();