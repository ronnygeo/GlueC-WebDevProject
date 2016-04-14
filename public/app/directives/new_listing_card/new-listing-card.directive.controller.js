/**
 * Created by Bhanu on 23/03/2016.
 */

"use strict";
(function () {

    angular.module("gluec.directives")
        .controller("NewListingDirectiveController", NewListingDirectiveController);

    function NewListingDirectiveController($timeout, $scope) {

        $scope.uploadImageChange = uploadImageChange;


        function init() {
            angular.element(document).ready(function () {
                $timeout(function () {
                    $('.collapsible').collapsible({});
                    $('select').material_select();
                }, 0, false);
            });
        }
        init();
    }

    function uploadImageChange($event) {
        console.log($event.target);
        var parentDivId = $($event.target).parent().attr('id');
        console.log($($event.target).parent());
        console.log(parentDivId);
        var input = $('#' + parentDivId + ' input');
        console.log(input);
        console.log(input.files[0]);
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#uploadedImage').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

})();