/**
 * Created by ronnygeo on 3/25/16.
 */
(function () {
    'use strict';

    angular.module('GluecApp')
        .controller("ProfileController", ProfileController);

    ProfileController.$inject = ['$rootScope', 'UserService', '$location', 'Upload', '$timeout'];

    function ProfileController($rootScope, UserService, $location, Upload, $timeout) {
        var vm = this;

        vm.user = $rootScope.user;
        vm.update = update;

        angular.element(document).ready(function () {
            $timeout(function () {
                $('select').material_select();
            }, 0, false);
        });

        function update() {
            //console.log($scope.user);
            if (vm.user.image) {
                // console.log('Image Upload');
                Upload.upload({
                    url: '/api/user/upload', //webAPI exposed to upload the file
                    data: {file: vm.user.image} //pass file as data, should be user ng-model
                }).then(function (res) { //upload function returns a promise
                    if (res.data.error_code !== 1) { //validate success
                        // console.log(res.data);
                        vm.user.imageUrl = res.data;
                        UserService.updateUser(vm.user._id, vm.user).then(render);
                    } else {
                        console.log('an error occurred');
                    }
                });
            } else {
                UserService.updateUser(vm.user._id, vm.user)
                    .then(render);
            }

        }

        function render(data) {
            $rootScope.user = vm.user;
            // $route.reload();
            $location.url('/dashboard');
            // console.log(data.roles);
        }
    }
})();