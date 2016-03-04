    /**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller('HomeController', HomeController);

    function HomeController(EbayService, $location, $scope, $rootScope) {
        $scope.$location = $location;
        $scope.search = search;
        function search(){
            EbayService.findItemsByKeywords(callback);

            function callback(response){
                $rootScope.products = response;
                $location.url("/search");
            }

        }
    };
})();