/**
 * Created by Bhanu on 4/27/16.
 */
"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller('HelpController', HelpController);

    function HelpController($location, $rootScope, $timeout) {

        var HelpController = this;

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