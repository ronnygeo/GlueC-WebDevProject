/**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular.module('GluecApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['UserService', '$location', '$rootScope'];

    function LoginController(UserService, $location, $rootScope) {
        var vm = this;
        //Event Handlers Decelerations
        vm.login = Login;

        //Event Handlers Implementations
        function Login() {
            UserService.findUserByCredentials(vm.user.username, vm.user.password).then(render, function (err) {
                    $('#login-alert').show();
            });

            function render(response) {
                if (response.data != null) {
                    // console.log(response.data);
                    //Storing the user in the Root Scope
                    $rootScope.user = response.data;
                    // Navigating to the Profile Page of this particular User
                    $location.url("/");
                } else {
                    $('#login-alert').show();
                }
                // else {
                //     console.log(response.data);
                //     angular.element(document).ready(function () {
                //         $('#login-alert').show();
                //     });
                // }
            }
        }


    };

})();