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
                    templateUrl: 'views/home/home.view.html',
                    resolve: {
                        loggedin: checkCurrentUser
                    }
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
                .when('/help', {
                    templateUrl: 'views/help/help.view.html',
                    controller: 'HelpController',
                    controllerAs: 'model'
                })
                .when('/search/q/:keyword', {
                    controller: 'SearchController',
                    templateUrl: 'views/search/search.view.html',
                    controllerAs: "model"
                })
                .when('/dashboard', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/dashboard/users', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .when('/dashboard/catalogs', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkMerchant
                    }
                })
                .when('/dashboard/catalog/new', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkMerchant,
                        categories: getCategories
                    }
                })
                .when('/dashboard/catalog/:catId/edit', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkMerchant,
                        categories: getCategories
                    }
                })
                .when('/dashboard/catalog/:catId/products', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkMerchant,
                        categories: getCategories
                    }
                })
                .when('/dashboard/listings', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/dashboard/listing/:listingId/view', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/dashboard/providers', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/dashboard/provider/new', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/dashboard/products', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkMerchant
                    }
                })
                .when('/dashboard/product/new', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkMerchant
                    }
                })
                .when('/dashboard/product/:prodId/edit', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkMerchant
                    }
                })
                .when('/dashboard/product/:prodId/view', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkMerchant
                    }
                })
                .when('/dashboard/profile', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/dashboard/profile/edit', {
                    controller: 'DashboardController',
                    templateUrl: 'views/dashboard/dashboard.view.html',
                    controllerAs: 'dc',
                    loginRequired: true,
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/item/:providerId/:productId', {
                    controller: 'PDPController',
                    controllerAs: "model",
                    templateUrl: 'views/product/pdp.view.html'
                })
                .when('/listing/create/:flow', {
                    controller: 'CreateListingController',
                    templateUrl: 'views/listing/direct/create-listing.view.html',
                    controllerAs: "model",
                    loginRequired: true,
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/messages', {
                    controller: 'MessageController',
                    templateUrl: 'views/messages/messages.view.html',
                    controllerAs: "mc",
                    loginRequired: true,
                    resolve: {
                        loggedin: checkLoggedin
                    }
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
                colours: ['#DD0000', '#DDAA00', '#0000BB', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
                responsive: true
            });
        });

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1) {
                $rootScope.user = user;
                deferred.resolve();
            } else {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkMerchant = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && (user.roles.indexOf('merchant') != -1 || user.roles.indexOf('admin') != -1)) {
                $rootScope.user = user;
                deferred.resolve();
            } else {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });
        var postLogInRoute;
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {

            //if login required and you're logged out, capture the current path
            // console.log(currentRoute);
            if (nextRoute.loginRequired && !$rootScope.user) {
                postLogInRoute = $location.path();
                $location.path('/login').replace();
            } else if (postLogInRoute && $rootScope.user) {
                //once logged in, redirect to the last route and reset it
                $location.path(postLogInRoute).replace();
                postLogInRoute = null;
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        // console.log("checkLoggedin");
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function (user) {
            // User is Authenticated
            if (user !== '0') {
                $rootScope.user = user;
                deferred.resolve(user);
            }
            // User is Not Authenticated
            else {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        var postLogInRoute;
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {

            //if login required and you're logged out, capture the current path
            // console.log(currentRoute);
            if (nextRoute.loginRequired && !$rootScope.user) {
                postLogInRoute = $location.path();
                $location.path('/login').replace();
            } else if (postLogInRoute && $rootScope.user) {
                //once logged in, redirect to the last route and reset it
                $location.path(postLogInRoute).replace();
                postLogInRoute = null;
            }
        });
        return deferred.promise;
    };

    var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.user = user;
            }
            deferred.resolve();
        });
        var postLogInRoute;
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {

            //if login required and you're logged out, capture the current path
            // console.log(currentRoute);
            if (nextRoute.loginRequired && !$rootScope.user) {
                postLogInRoute = $location.path();
                $location.path('/login').replace();
            } else if (postLogInRoute && $rootScope.user) {
                //once logged in, redirect to the last route and reset it
                $location.path(postLogInRoute).replace();
                postLogInRoute = null;
            }
        });

        return deferred.promise;
    };

    var getCategories = function (CategoryService, $q, $rootScope) {
        var deferred = $q.defer();
        var providerId = "10001";
        CategoryService
            .getTopLevelCategories(providerId)
            .then(success_callback, error_callback);
        function success_callback(response) {
            console.log(response.data);
            $rootScope.catalogCatData = response.data;
            deferred.resolve(response.data);
        }

        function error_callback(error) {
            deferred.reject(error);
            console.log(error);
        }

        return deferred.promise;
    };

    var getSubCategories = function (CategoryService, $q, $rootScope) {
        var deferred = $q.defer();
        var providerId = "10001";
        CategoryService
            .getTopLevelCategories(providerId)
            .then(success_callback, error_callback);
        function success_callback(response) {
            console.log(response.data);
            $rootScope.prodSubCatData = response.data;
            deferred.resolve(response.data);
        }

        function error_callback(error) {
            deferred.reject(error);
            console.log(error);
        }

        return deferred.promise;
    }
})();