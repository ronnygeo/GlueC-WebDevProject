/**
 * Created by ronnygeo on 4/15/16.
 */
(function () {
    angular.module('GluecApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$rootScope', '$timeout'];
    function DashboardController($rootScope, $timeout) {
        var vm = this;
        vm.user = $rootScope.user;
        // console.log($routeParams.catId);
        // var userId = user._id;

        angular.element(document).ready(function (){
            $timeout(function (){
            $('.dropdown-button').dropdown({
                    inDuration: 300,
                    outDuration: 225,
                    constrain_width: false, // Does not change width of dropdown to that of the activator
                    hover: true, // Activate on hover
                    gutter: 0, // Spacing from edge
                    belowOrigin: false, // Displays dropdown below the button
                    alignment: 'left' // Displays dropdown with edge aligned to the left of button
                }
            )}, 100, false);
        });

        vm.isUserAdmin = isUserAdmin;
        vm.isUserMerchant = isUserMerchant;

        function isUserAdmin() {
            return vm.user.roles.indexOf('admin') != -1;
        }

        function isUserMerchant() {
            return vm.user.roles.indexOf('merchant') != -1;
        }
    }
})();