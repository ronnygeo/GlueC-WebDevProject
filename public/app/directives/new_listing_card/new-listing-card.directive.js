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
                scope.applyOperation = function (operationId) {
                    console.log("Apply Operation in Directive");
                    $(".collapsible-header").removeClass("active");
                    scope.$parent.model.applyOperation(operationId);
                };
                scope.removeOperation = function (operation,event) {
                    console.log("Operaiton Type "+operation.type);
                    if( operation.type == "FILTER"){
                        scope.$parent.model.removeOperation(operation.id);
                    }

                }
            }
        }

    }
})();