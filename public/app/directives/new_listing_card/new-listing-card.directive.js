/**
 * Created by Bhanu on 23/03/2016.
 */

"use strict";
(function () {

    angular
        .module("gluec.directives")
        .directive("newListingCard", NewListingCard);

    function NewListingCard($timeout) {
        return {
            scope: {
                "card": "="
            },
            templateUrl: "directives/new_listing_card/new-listing-card.directive.view.html",
            controller: "NewListingDirectiveController",
            controllerAs: "model",
            link: function (scope, element, attrs) {
                scope.apply = function (selectedData) {
                    console.log("Apply operation [" + scope.card.type + "] in directive");
                    console.log("Selected Data [" + selectedData + "] in directive");
                    upadateHeader(scope, selectedData);
                    scope.card.selectedData = selectedData;
                    scope.$parent.model.apply(scope.card);
                };
            }
        };

        function upadateHeader(scope, selectedData) {
            console.log("Updating Header");
            if (scope.card.type == "parentCategory") {
                scope.card.header = selectedData.name;
                $('#catgory_' + selectedData._id).addClass("active");
            } else if (scope.card.type == "subCategory") {
                scope.card.header = selectedData.name;
                $('#catgory_' + selectedData._id).addClass("active");
            } else if (scope.card.type == "uploadImage") {
                console.log(selectedData);
                scope.card.header = selectedData.name;
            }
            angular.element(document).ready(function () {
                $timeout(function () {
                    $("#card_" + scope.card.type + " .collapsible-header").removeClass("active");
                }, 0, false);
            });
        }


    }
})();