/**
 * Created by Bhanu on 23/03/2016.
 */

"use strict";
(function () {

    angular
        .module("gluec.directives")
        .directive("newListingCard", NewListingCard);

    function NewListingCard($compile) {
        return {
            scope: {
                "card": "="
            },
            templateUrl: "directives/new_listing_card/new-listing-card.directive.view.html",
            controller: "NewListingDirectiveController",
            controllerAs: "model",
            link: function (scope, element, attrs) {
                scope.apply = function (selectedData) {
                    console.log("Apply operation ["+ scope.card.type +"] in directive");
                    console.log("Selected Data ["+ selectedData +"] in directive");
                    scope.card.selectedData = selectedData;
                    $(".collapsible-header").removeClass("active");
                    scope.$parent.model.apply(scope.card);
                };
            }
        }
    }
})();