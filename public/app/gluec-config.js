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
                // .when('/profile', {
                //     controller: "ProfileController",
                //     templateUrl: 'views/users/profile.view.html',
                //     controllerAs: "user"
                // })
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
                // .when('/userdash', {
                //     controller: 'UserDashboardController',
                //     templateUrl: 'views/dashboard/dashboard.user.view.html',
                //     controllerAs: 'cc'
                // })
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
                // .when('/admin', {
                //     controller: 'AdminDashboardController',
                //     templateUrl: 'views/admin/dashboard.admin.view.html',
                //     controllerAs: 'admin'
                // })
                // .when('/user/:id/catalog/:catId', {
                //     controlle    r: 'ShowCatalogController',
                //     templateUrl: 'views/catalog/show/show.catalog.view.html',
                //     controllerAs: "cc"
                // })
                // .when('/user/:id', {
                //     controller: 'ShowUserController',
                //     templateUrl: 'views/users/show.user.view.html',
                //     controllerAs: "model"
                // })
                .when('/user/:id/messages', {
                    controller: 'MessageController',
                    templateUrl: 'views/messages/messages.view.html',
                    controllerAs: "mc"
                })
                // .when('/user/:id/catalog', {
                //     controller: 'NewCatalogController',
                //     templateUrl: 'views/catalog/new/new.catalog.view.html',
                //     controllerAs: "cc"
                // })
                // .when('/user/:id/product', {
                //     controller: 'NewProductController',
                //     templateUrl: 'views/product/new.product.view.html',
                //     controllerAs: "pc"
                // })
                // .when('/user/:id/product/:prodId', {
                //     controller: 'ShowProductController',
                //     templateUrl: 'views/product/show.product.view.html',
                //     controllerAs: "model"
                // })
                // .when('/user/:id/product/:prodId/edit', {
                //     controller: 'EditProductController',
                //     templateUrl: 'views/product/edit.product.view.html',
                //     controllerAs: "pc"
                // })
                // .when('/user/:id/catalog/:catId/product', {
                //     controller: 'NewProductController',
                //     templateUrl: 'views/product/new.product.view.html',
                //     controllerAs: "pc"
                // })
                // .when('/user/:id/catalog/:catId/edit', {
                //     controller: 'EditCatalogController',
                //     templateUrl: 'views/catalog/edit/edit.catalog.view.html',
                //     controllerAs: "cc"
                // })
                .when('/test', {
                    templateUrl: 'views/dashboard/test.material.html'
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
})();