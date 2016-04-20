/**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular
        .module("GluecApp", [
            "ngRoute",
            "angular.filter",
            "gluec.directives",
            "ngProgress",
            'chart.js',
            'ngFileUpload'
        ])
        .run(function ($location, $rootScope) {
            var postLogInRoute;
            $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {

                //if login required and you're logged out, capture the current path
                if (nextRoute.loginRequired && !$rootScope.user) {
                    postLogInRoute = $location.path();
                    $location.path('/login').replace();
                } else if (postLogInRoute && $rootScope.user) {
                    //once logged in, redirect to the last route and reset it
                    $location.path(postLogInRoute).replace();
                    postLogInRoute = null;
                }
            });
        });

})();