    /**
 * Created by ronnygeo on 2/17/16.
 */
"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller('HomeController', HomeController);

    function HomeController(EbayService, $location, $scope, $rootScope, ngProgressFactory) {
        $scope.$location = $location;
        $scope.search = search;

        function search(){
            if ($scope.search_input) {
                EbayService
                    .findItemsByKeywords($scope.search_input)
                    .then(render);
                $scope.progressbar = ngProgressFactory.createInstance();
                $scope.progressbar.setHeight('4px');
                $scope.progressbar.setColor('#E64A19');
                $scope.progressbar.start();
            }

            function render(response){
                $scope.progressbar.complete();
                console.log(response.data.findItemsByKeywordsResponse[0].searchResult[0].item);
                $rootScope.products = response.data.findItemsByKeywordsResponse[0].searchResult[0].item;
                $location.url("/search");
            }

        }
    }
})();