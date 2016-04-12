/**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$rootScope', '$location'];

    function RegisterController(UserService, $rootScope, $location) {
        var vm = this;

        vm.user = {};
        //Event Handlers Decelerations
        vm.register = Register;

        // angular.element(document).ready(function() {
        //     $('select').material_select('destroy');
        // });
        //Event Handlers Implementations
        function Register() {
            console.log(vm.user);
            UserService.createUser(vm.user).then(function (response) {
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