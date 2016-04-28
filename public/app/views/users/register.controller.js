/**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$rootScope', '$location','$timeout','Upload'];

    function RegisterController(UserService, $rootScope, $location, $timeout, Upload) {
        var vm = this;

        vm.user = {};
        //Event Handlers Decelerations
        vm.register = Register;

        function init() {
            angular.element(document).ready(function () {
                $timeout(function () {
                    $('select').material_select();
                }, 0, false);
            });
        }

        init();

        // angular.element(document).ready(function() {
        //     $('select').material_select('destroy');
        // });
        //Event Handlers Implementations
        function Register() {
            if (vm.user.image) {
            Upload.upload({
                url: '/api/user/upload', //webAPI exposed to upload the file
                data:{file:vm.user.image} //pass file as data, should be user ng-model
            }).then(function (res) { //upload function returns a promise
                if (res.data.error_code !== 1) { //validate success
                    console.log(res.data);
                    vm.user.imageUrl = res.data;
                    UserService.createUser(vm.user).then(function (response) {
                        if (response.data != null) {
                            //Storing the user in the Root Scope
                            $rootScope.user = response.data;
                            // Navigating to the Profile Page of this particular User
                            $location.url("/");
                        }
                    });
                    
                } else {
                    console.log('an error occurred');
                }
            });

        } else {
                if (vm.user.imageUrl == undefined) {
                    vm.user.imageUrl = '/media/placeholder-new-listing-image.png';
                }
                UserService.createUser(vm.user).then(function (response) {
                    if (response.data != null) {
                        //Storing the user in the Root Scope
                        $rootScope.user = response.data;
                        // Navigating to the Profile Page of this particular User
                        $location.url("/");
                    }
                });
            }
        }
    }
})();