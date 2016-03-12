/**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular
        .module('GluecApp')
        .config(function ($routeProvider,$httpProvider) {
            $routeProvider
                .when('/', {
                    controller: 'HomeController',
                    templateUrl: 'views/home/home.view.html'
                })
                .when('/login', {
                    controller: 'LoginController',
                    templateUrl: 'views/users/login.view.html'
                })
                .when('/register', {
                    controller: 'RegisterController',
                    templateUrl: 'views/users/register.view.html'
                })
                .when('/search/q/:keyword', {
                    controller: 'SearchController',
                    templateUrl: 'views/search/search.view.html',
                    controllerAs: "model"
                })
                .when('/admin', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html'
                })
                .when('/item/:productId', {
                    controller: 'PDPController',
                    templateUrl: 'views/product/pdp.view.html',
                    controllerAs: "model"
                })
                .when('/listing/create', {
                    controller: 'CreateListingController',
                    templateUrl: 'views/listing/create-listing.view.html',
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: '/'
                })

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

        });
})();