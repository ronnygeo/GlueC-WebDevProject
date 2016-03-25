/**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller('RegisterController', RegisterController);

    function RegisterController(UserService, $scope, $rootScope, $location) {

        //Event Handlers Decelerations
        $scope.register = Register;

        //Event Handlers Implementations
        function Register(form_user) {

            UserService.createCatalog(form_user).then(function userRegisterCallback(response) {
                    if (response.data != null) {
                        //Storing the user in the Root Scope
                        $rootScope.user = response.data;
                        // Navigating to the Profile Page of this particular User
                        $location.url("/");
                    }
                }
            )
        }
    }
})();