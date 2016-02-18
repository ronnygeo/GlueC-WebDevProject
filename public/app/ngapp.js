/**
 * Created by ronnygeo on 2/17/16.
 */

(function(){
    var app = angular.module('GlueCApp', ['ngRoute']);
    app.controller('MainController', ['$scope', '$location', function($scope, $location){
        $scope.$location = $location;
    }]);
})();