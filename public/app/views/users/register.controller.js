/**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, $scope, $rootScope) {
        $scope.$location = $location;
    };
})();