/**
 * Created by Bhanu on 03/03/2016.
 */

"use strict";
(function(){
    angular
        .module("GluecApp")
        .controller("MainController",MainController);

    function MainController($location, $scope, $rootScope){
        $scope.$location = $location;
    }
})();