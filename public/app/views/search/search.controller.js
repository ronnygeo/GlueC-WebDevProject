/**
 * Created by Bhanu on 03/03/2016.
 */

"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller("SearchController",SearchController);

    function SearchController(EbayService, $scope, $routeParams, $location, $rootScope, ngProgressFactory){

        $scope.$location = $location;
        //$scope.search = search;
        var vm = this;
        var keyword= $routeParams.keyword;

        function init(){
            search();
        }init()

        function search(){
            if (keyword && keyword!="") {
                EbayService
                    .findItemsByKeywords(keyword)
                    .then(render);
                $rootScope.progressbar = ngProgressFactory.createInstance();
                $rootScope.progressbar.setHeight('4px');
                $rootScope.progressbar.setColor('#E64A19');
                $rootScope.progressbar.start();
            }

            function render(response){
                $rootScope.progressbar.complete();
                console.log(response.data.findItemsByKeywordsResponse[0].searchResult[0].item);
                vm.products = response.data.findItemsByKeywordsResponse[0].searchResult[0].item;
            }

        }


    };
})();