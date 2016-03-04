/**
 * Created by Bhanu on 04/03/2016.
 */

"use strict";
(function () {
    angular
        .module("gluec.directives")
        .directive("mobileNav", mobileNav);

    function mobileNav() {
        return {
            link: function (element) {
                $(element).sideNav();
                //elem.bind('click', function () {
                //    elem.sideNav();
                //});
            }
        };
    }
})();
