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
                    if (!selectedData) {
                        console.log("No Data Selected");
                        return;
                    }
                    console.log("Apply operation [" + scope.card.type + "] in directive");
                    console.log("Selected Data [" + selectedData + "] in directive");
                    processList(scope, selectedData);
                    scope.card.selectedData = selectedData;
                    scope.$parent.model.apply(scope.card);
                };
            }
        };

        function processList(scope, selectedData) {
            console.log("processList");
            if (scope.card.type == "provider") {
                //Update Header
                scope.card.header = "Provider - " + selectedData.name;
                // remove previously selected active
                if (scope.card.selectedData) {
                    $('#provider_' + scope.card.selectedData._id).removeClass("active");
                }
                // add active to current selected row
                $('#provider_' + selectedData._id).addClass("active");
            }
            else if (scope.card.type == "parentCategory") {
                //Update Header
                scope.card.header = "Top Category - " + selectedData.name;
                // remove previously selected active
                if (scope.card.selectedData) {
                    $('#catgory_' + scope.card.selectedData._id).removeClass("active");
                }
                // add active to current selected row
                $('#catgory_' + selectedData._id).addClass("active");
            } else if (scope.card.type == "subCategory") {
                //Update Header
                scope.card.header = "Sub Category - " + selectedData.name;
                // remove previously selected active
                if (scope.card.selectedData) {
                    $('#catgory_' + scope.card.selectedData._id).removeClass("active");
                }
                // add active to current selected row
                $('#catgory_' + selectedData._id).addClass("active");
            } else if (scope.card.type == "uploadImage") {
                //Update Header
                scope.card.header = "Image - " + selectedData.name;
            }
            //Closing current accordion
            angular.element(document).ready(function () {
                $timeout(function () {
                    $("#card_" + scope.card.type + " .collapsible-header").removeClass("active");
                }, 0, false);
            });
        }


    }
})();