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

                console.log(response.findItemsByKeywordsResponse[0].searchResult[0].item);
                $rootScope.products = response.findItemsByKeywordsResponse[0].searchResult[0].item;
                $location.url("/search");
            }

        }
    };
})();