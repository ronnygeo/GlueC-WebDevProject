/**
 * Created by ronnygeo on 3/25/16.
 */
(function () {
    'use strict';

    angular.module('GluecApp')
        .controller("ProfileController", ProfileController);

    ProfileController.$inject = ['$rootScope', 'UserService', '$route', 'Upload'];

    function ProfileController($rootScope, UserService, $route, Upload) {
        var vm = this;

        vm.user = $rootScope.user;
        vm.update = update;

        angular.element(document).ready(function() {
            $('select').material_select(vm.user.roles[0]);
        });

        function update() {
            //console.log($scope.user);
            if (vm.user.image) {
                console.log('Image Upload');
                Upload.upload({
                    url: '/api/user/upload', //webAPI exposed to upload the file
                    data:{file:vm.user.image} //pass file as data, should be user ng-model
                }).then(function (res) { //upload function returns a promise
                    if (res.data.error_code !== 1) { //validate success
                        console.log(res.data);
                        vm.user.imageUrl = '/media/images/users/'+res.data;
                        UserService.updateUser(vm.user._id, vm.user).then(render);
                    } else {
                        console.log('an error occurred');
                    }
                });
            } else {
                UserService.updateUser(vm.user._id, vm.user)
                    .then(render);
            }

        };

        function render(data) {
            $rootScope.user = vm.user;
            $route.reload();
            delete vm.is
            // console.log(data.roles);
        }
    }
})();