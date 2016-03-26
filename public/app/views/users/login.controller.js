/**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular.module('GluecApp')
        .controller('LoginController', LoginController);

    function LoginController(UserService, $scope, $location, $rootScope) {

        //Event Handlers Decelerations
        $scope.login = Login;

        //Event Handlers Implementations
        function Login() {
            UserService.findUserByCredentials($scope.user.username, $scope.user.password).then(render);

            function render(response) {
                if (response.data != null) {
                    // console.log(response.data);
                    //Storing the user in the Root Scope
                    $rootScope.user = response.data;
                    // Navigating to the Profile Page of this particular User
                    $location.url("/");
                }
                else {
                    $('#login-alert').show();
                }
            }
        };


    };

})();