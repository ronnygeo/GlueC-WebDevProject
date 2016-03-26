/**
 * Created by Bhanu on 23/03/2016.
 */

"use strict";
(function () {

    angular.module("gluec.directives")
        .controller("NewListingDirectiveController", NewListingDirectiveController);

    function NewListingDirectiveController($timeout) {

        var NewListingDirectiveController = this;

        function init() {
            angular.element(document).ready(function () {
                $timeout(function () {
                    $('.collapsible').collapsible({});
                }, 0, false);
            });
        }

        init();


    }


})();