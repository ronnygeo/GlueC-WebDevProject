/**
 * Created by ronnygeo on 3/25/16.
 */
(function () {
    'use strict';

    angular.module('GluecApp')
        .controller("ProfileController", ProfileController);

    ProfileController.$inject = ['$rootScope', 'UserService', '$route'];

    function ProfileController($rootScope, UserService, $route) {
        var vm = this;

        vm.user = $rootScope.user;
        vm.update = update;

        angular.element(document).ready(function() {
            $('select').material_select('destroy');
        });

        function update() {
            //console.log($scope.user);
            UserService.updateUser(vm.user._id, vm.user)
                .then(render);
        };

        function render(data) {
            $rootScope.user = vm.user;
            $route.reload();
            // console.log(data.roles);
        }
    }
})();