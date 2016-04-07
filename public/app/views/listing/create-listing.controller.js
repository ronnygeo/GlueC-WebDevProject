/**
 * Created by Bhanu on 11/03/2016.
 */

"use strict";
(function () {
    angular
        .module("GluecApp")
        .controller("CreateListingController", CreateListingController);

    function CreateListingController(CategoryService, ProgressBarFactory) {

        var CreateListingController = this;

        function init() {
            ProgressBarFactory.showProgressBar();
            initNewListing();
            addCategoryCard();
        }

        init();

        /*Event Handler Decelerations*/
        CreateListingController.apply = apply;

        function apply(cardType, data){
            if(cardType=="parentCategory"){
                CreateListingController.listing.parentCategory = data;
                addSubCategoryCard(data);
            }else if(cardType =="subCatergory"){

            }
        }

        function addSubCategoryCard(parentCategoryId){
            var providerId = 10001;//Ebay
            var subCategoryCard ={
                type:"subCategory",
                data:[]
            };
            CategoryService
                .getSubCategories(providerId ,parentCategoryId)
                .then(success_callback, error_callback);
            function success_callback(response) {
                console.log(response.data);
                subCategoryCard.data = response.data;
                ProgressBarFactory.hideProgressBar();
            }

            function error_callback(error) {
                console.log(error);
                ProgressBarFactory.hideProgressBar();
            }

            console.log(subCategoryCard);
            CreateListingController.listing.cards.push(subCategoryCard);
        }

        function initNewListing(){
            var newListing = {
                parentCategory: "",
                subCategory:"",
                cards: []
            };
            CreateListingController.listing = newListing;
        }

        function addCategoryCard() {
            var providerId = 10001;//Ebay
            var categoryCard ={
                type:"parentCategory",
                data:[]
            };
            CategoryService
                .getTopLevelCategories(providerId)
                .then(success_callback, error_callback);
            function success_callback(response) {
                console.log(response.data);
                categoryCard.data = response.data;
                ProgressBarFactory.hideProgressBar();
            }

            function error_callback(error) {
                console.log(error);
                ProgressBarFactory.hideProgressBar();
            }

            console.log(categoryCard);
            CreateListingController.listing.cards.push(categoryCard);
        }


        function getEbayCategories() {
            console.log("Calling Client Service");
            CategoryService
                .getTopLevelCategories(10001).then(success_callback, error_callback);
            function success_callback(response) {
                console.log(response.data);
            }

            function error_callback(error) {
                console.log(error);
            }

        }

    }
})
();