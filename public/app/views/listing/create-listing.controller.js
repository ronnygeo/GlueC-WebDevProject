/**
 * Created by Bhanu on 11/03/2016.
 */

"use strict";
(function (){
    angular
    .module("GluecApp")
    .controller("CreateListingController",CreateListingController);

    function CreateListingController(CategoryService){

        var CreateListingController = this;

        function init(){
            console.log("Calling Client Service");
            CategoryService
                .getTopLevelCategories(10001)
                .then(success_callback, error_callback);
            function success_callback(response){
                console.log(response.data);
                CreateListingController.categories = response.data;
            };

            function error_callback(error){
                console.log(error);
            };

        }init();



    }
})();