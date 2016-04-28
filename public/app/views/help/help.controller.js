/**
 * Created by Bhanu on 4/27/16.
 */
"use strict";
(function () {
    angular
        .module('GluecApp')
        .controller('HelpController', HelpController);

    function HelpController($timeout, ProgressBarFactory) {

        var HelpController = this;

        function init() {
            ProgressBarFactory.showProgressBar();
            angular.element(document).ready(function () {
                $timeout(function () {
                    $('.collapsible').collapsible({});
                }, 0, false);
            });

            $timeout(function () {
                ProgressBarFactory.hideProgressBar();
            }, 1000, false);
        }
        init();

    }
})();