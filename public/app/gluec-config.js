/**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular
        .module('GluecApp')
        .config(function ($routeProvider, $httpProvider, ChartJsProvider) {
            $routeProvider
                .when('/', {
                    controller: 'HomeController',
                    controllerAs: "model",
                    templateUrl: 'views/home/home.view.html'
                })
                .when('/login', {
                    controller: 'LoginController',
                    templateUrl: 'views/users/login.view.html',
                    controllerAs: 'lc'
                })
                .when('/register', {
                    controller: 'RegisterController',
                    templateUrl: 'views/users/register.view.html',
                    controllerAs: "user"
                })
                .when('/search/q/:keyword', {
                    controller: 'SearchController',
                    templateUrl: 'views/search/search.view.html',
                    controllerAs: "model"
                })
                .when('/dashboard', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc'
                })
                .when('/dashboard/users', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc'
                })
                .when('/dashboard/catalogs', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc'
                })
                .when('/dashboard/catalog/new', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc'
                })
                .when('/dashboard/catalog/:catId/edit', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc'
                })
                .when('/dashboard/products', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc'
                })
                .when('/dashboard/product/new', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc'
                })
                .when('/dashboard/product/:prodId/edit', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc'
                })
                .when('/dashboard/product/:prodId/view', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc'
                })
                .when('/dashboard/profile', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc'
                })
                .when('/dashboard/profile/edit', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc'
                })
                .when('/item/:providerId/:productId', {
                    controller: 'PDPController',
                    templateUrl: 'views/product/pdp.view.html',
                    controllerAs: "model"
                })
                .when('/listing/direct/create', {
                    controller: 'CreateListingController',
                    templateUrl: 'views/listing/direct/create-listing.view.html',
                    controllerAs: "model"
                })
                .when('/listing/interactive', {
                    controller: 'InteractiveListingController',
                    templateUrl: 'views/listing/interactive.listing.view.html',
                    controllerAs: "lc"
                })
                .when('/messages', {
                    controller: 'MessageController',
                    templateUrl: 'views/messages/messages.view.html',
                    controllerAs: "mc"
                })
                .when('/sell', {
                    controller: 'SellController',
                    templateUrl: 'views/sell/sell.view.html',
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: '/'
                });

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            // Configure all charts
            ChartJsProvider.setOptions({
                colours: [ '#DD0000', '#DDAA00', '#0000BB', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
                responsive: true
            });
        });
        // .config(['flowFactoryProvider', function (flowFactoryProvider) {
        //     flowFactoryProvider.defaults = {
        //         target: '/media/images/users',
        //         permanentErrors: [404, 500, 501]
        //     }
        // }]);
})();