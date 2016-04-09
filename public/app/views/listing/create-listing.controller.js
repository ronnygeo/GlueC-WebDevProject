/**
 * Created by Bhanu on 11/03/2016.
 */

"use strict";
(function () {
    angular
        .module("GluecApp")
        .controller("CreateListingController", CreateListingController);

    function CreateListingController(CategoryService, ProgressBarFactory, ListingService, $rootScope, $location) {

        var CreateListingController = this;

        function init() {
            if(!$rootScope.user){
                $location.url("/login");
                return
            }
            ProgressBarFactory.showProgressBar();
            initNewListing();
            addCategoryCard();
        }

        init();

        /*Event Handler Decelerations*/
        CreateListingController.apply = apply;

        function apply(card) {
            console.log(card);
            if (card.type == "parentCategory") {
                CreateListingController.listing.parentCategory = card.selectedData;
                addSubCategoryCard(card.selectedData);
            } else if (card.type == "subCategory") {
                CreateListingController.listing.subCategory = card.selectedData;
                addUploadImageCard();

            } else if (card.type == "uploadImage") {
                CreateListingController.listing.image = card.selectedData;
                addNewListingCard(card.selectedData);
            }
        }

        function addUploadImageCard(image) {
            var providerId = 10001;//Ebay
            var uploadImageCard = {
                type: "uploadImage",
                data: [],
                selectedData: ""
            };
            CreateListingController.listing.cards.push(uploadImageCard);
        }

        function addNewListingCard() {
            var newListingCard = {
                type: "newListing",
                data: [],
                selectedData: ""
            };
            var newListing = {
                parentCategory: CreateListingController.listing.parentCategory,
                subCategory: CreateListingController.listing.subCategory,
                image: CreateListingController.listing.image,
                providerId: CreateListingController.listing.providerId,
                userId: CreateListingController.listing.userId,
                title: CreateListingController.title,
                description: CreateListingController.description,
                model: CreateListingController.model,
                ebay: CreateListingController.ebay
            };
            ListingService
                .getNewListingTemplate(newListing)
                .then(success_callback, error_callback);
            function success_callback(response) {
                console.log(response.data);
                newListingCard.data = response.data;
                ProgressBarFactory.hideProgressBar();
            }

            function error_callback(error) {
                console.log(error);
                ProgressBarFactory.hideProgressBar();
            }

            console.log(newListingCard);
            CreateListingController.listing.cards.push(newListingCard);
        }

        function addSubCategoryCard(parentCategoryId) {
            var subCategoryCard = {
                type: "subCategory",
                data: [],
                selectedData: ""
            };
            CategoryService
                .getSubCategories(CreateListingController.listing.providerId, parentCategoryId)
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

        function initNewListing() {
            var newListing = {
                parentCategory: "",
                subCategory: "",
                image: "",
                providerId: "10001",//Ebay
                cards: [],
                userId: $rootScope.user._id,
                title: "",
                description: "",
                model: "",
                ebay: {
                    ebayListingId: "",
                    itemCondition: "",
                    listingType: "",
                    paymentMethod: "",
                    returnPolicyEnabled: "",
                    listingDuration: ""
                }

            };
            CreateListingController.listing = newListing;
        }

        function addCategoryCard() {
            var categoryCard = {
                type: "parentCategory",
                data: [],
                selectedData: ""
            };
            CategoryService
                .getTopLevelCategories(CreateListingController.listing.providerId)
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
                .getTopLevelCategories(CreateListingController.listing.providerId)
                .then(success_callback, error_callback);
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