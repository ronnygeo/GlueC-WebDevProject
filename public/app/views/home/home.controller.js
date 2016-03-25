/**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller('HomeController', HomeController);

    function HomeController(ProductService, $location, $scope, $rootScope, ngProgressFactory) {

        var HomeController = this;

        HomeController.search = search;

        function search($event) {
            var keyCode = $event.which || $event.keyCode;
            if (keyCode === 13) {
                console.log("Got KeyEvent Enter");
                $location.url("/search/q/" + HomeController.search_input);
            }
        }

    }
})();