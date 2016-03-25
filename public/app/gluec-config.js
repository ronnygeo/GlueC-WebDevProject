/**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular
        .module('GluecApp')
        .config(function ($routeProvider, $httpProvider) {
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
                .when('/profile', {
                    controller: "ProfileController",
                    templateUrl: 'views/users/profile.view.html',
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
                    controllerAs: 'cc'
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
                .when('/admin', {
                    controller: 'AdminDashboardController',
                    templateUrl: 'views/admin/dashboard.admin.view.html',
                    controllerAs: 'admin'
                })
                .when('/admin/catalogs', {
                    controller: 'ShowAllCatalogController',
                    templateUrl: 'views/catalog/showall.catalog.view.html',
                    controllerAs: "cc"
                })
                .when('/user/:id/catalog/:catId', {
                    controller: 'ShowCatalogController',
                    templateUrl: 'views/catalog/show.catalog.view.html',
                    controllerAs: "cc"
                })
                .when('/user/:id/catalog/new', {
                    controller: 'CreateCatalogController',
                    templateUrl: 'views/catalog/create.catalog.view.html',
                    controllerAs: "cc"
                })
                .when('/user/:id/catalog/:catId/edit', {
                    controller: 'EditCatalogController',
                    templateUrl: 'views/catalog/edit.catalog.view.html',
                    controllerAs: "cc"
                })
                .otherwise({
                    redirectTo: '/'
                });

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

        });
})();