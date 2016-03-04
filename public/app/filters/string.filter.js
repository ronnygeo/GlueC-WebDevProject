/**
 * Created by Bhanu on 03/03/2016.
 */

"use strict";
(function () {
    angular
        .module("GluecApp")
        .filter('removeDoubleQuotes', function () {
            return function (input) {
                return String(input).replace("&quot;", "");
            };
        });
})();