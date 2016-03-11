/**
 * Created by Bhanu on 03/03/2016.
 */

"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller("SearchController", SearchController);

    SearchController.$inject = ['EbayService', '$scope', '$routeParams', '$location', 'ProgressBarFactory'];

    function SearchController(EbayService, $scope, $routeParams, $location, ProgressBarFactory) {

        $scope.$location = $location;
        //$scope.search = search;
        var vm = this;
        var keyword = $routeParams.keyword;

        function init() {
            search();
        }

        init()

        function search() {
            if (keyword && keyword != "") {
                EbayService
                    .findItemsAdvanced(keyword)
                    .then(render);
                ProgressBarFactory.showProgressBar();
            }

            function render(response) {
                ProgressBarFactory.hideProgressBar();
                //console.log(response.data.findItemsByKeywordsResponse[0].searchResult[0].item);
                console.log(response.data.findItemsAdvancedResponse[0].searchResult[0].item);
                //vm.products = response.data.findItemsByKeywordsResponse[0].searchResult[0].item;
                vm.products = response.data.findItemsAdvancedResponse[0].searchResult[0].item;
            }

        }


    };
})();