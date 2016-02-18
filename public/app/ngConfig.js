/**
 * Created by ronnygeo on 2/17/16.
 */
(function(){
    angular.module('GlueCApp')
        .config(function($routeProvider){
            $routeProvider
                .when('/', {
                    controller: 'HomeController',
                    templateUrl: 'modules/home/home.view.html'
                })
                .when('/login', {
                    controller: 'LoginController',
                    templateUrl: 'modules/users/login.view.html'
                })
                .when('/register', {
                    controller: 'RegisterController',
                    templateUrl: 'modules/users/register.view.html'
                })
                .otherwise({
                    redirectTo: '/'
                })
        });
})();