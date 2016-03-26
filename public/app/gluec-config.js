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
                .when('/item/:providerId/:productId', {
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
                .when('/user/:id/catalog/:catId', {
                    controller: 'ShowCatalogController',
                    templateUrl: 'views/catalog/show/show.catalog.view.html',
                    controllerAs: "cc"
                })
                .when('/user/:id', {
                    controller: 'ShowUserController',
                    templateUrl: 'views/users/show.user.view.html',
                    controllerAs: "model"
                })
                .when('/user/:id/catalog', {
                    controller: 'NewCatalogController',
                    templateUrl: 'views/catalog/new/new.catalog.view.html',
                    controllerAs: "cc"
                })
                .when('/user/:id/product', {
                    controller: 'NewProductController',
                    templateUrl: 'views/product/new.product.view.html',
                    controllerAs: "pc"
                })
                .when('/user/:id/product/:prodId', {
                    controller: 'ShowProductController',
                    templateUrl: 'views/product/show.product.view.html',
                    controllerAs: "model"
                })
                .when('/user/:id/catalog/:catId/product', {
                    controller: 'NewProductController',
                    templateUrl: 'views/product/new.product.view.html',
                    controllerAs: "pc"
                })
                .when('/user/:id/catalog/:catId/edit', {
                    controller: 'EditCatalogController',
                    templateUrl: 'views/catalog/edit/edit.catalog.view.html',
                    controllerAs: "cc"
                })
                .otherwise({
                    redirectTo: '/'
                });

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            // Configure all charts
            ChartJsProvider.setOptions({
                colours: ['#FF5252', '#FF8A80'],
                responsive: true
            });
        });
})();