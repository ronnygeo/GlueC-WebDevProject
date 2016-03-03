/**
 * Created by ronnygeo on 2/17/16.
 */
(function(){
    angular.module('GlueCApp')
        .config(function($routeProvider){
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
                .otherwise({
                    redirectTo: '/'
                })
        });
})();