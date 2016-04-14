/**
 * Created by Bhanu on 11/03/2016.
 */

"use strict";
(function () {
    angular
        .module("GluecApp")
        .factory("ProgressBarFactory",ProgressBarFactory);

    function ProgressBarFactory(ngProgressFactory, $rootScope) {

        var factoryMethods = {
            showProgressBar: showProgressBar,
            hideProgressBar: hideProgressBar
        };
        return factoryMethods;

        function showProgressBar() {
            $rootScope.progressbar = ngProgressFactory.createInstance();
            $rootScope.progressbar.setHeight('4px');
            $rootScope.progressbar.setColor('#00a1bc');
            $rootScope.progressbar.start();
        }

        function hideProgressBar() {
            $rootScope.progressbar.complete();
        }

    }
})();