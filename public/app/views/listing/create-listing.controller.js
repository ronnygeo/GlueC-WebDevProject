/**
 * Created by Bhanu on 11/03/2016.
 */

"use strict";
(function () {
    angular
        .module("GluecApp")
        .controller("CreateListingController", CreateListingController);

    function CreateListingController(CategoryService, ProgressBarFactory, ListingService, $rootScope, $location, $timeout) {

        var CreateListingController = this;

        function init() {
            if (!$rootScope.user) {
                $location.url("/login");
                return
            }
            initNewListing();
            addCategoryCard();
        }

        init();

        /*Event Handler Decelerations*/
        CreateListingController.apply = apply;

        function apply(card) {
            console.log(card);
            if (card.type == "parentCategory") {
                CreateListingController.listing.ebay_parentCategory = card.selectedData._id;
                addSubCategoryCard(card.selectedData._id);
            } else if (card.type == "subCategory") {
                if (!card.selectedData.leaf) {
                    console.log("Not Leaf Category.");
                    addSubCategoryCard(card.selectedData._id)
                } else {
                    console.log("Leaf Category.");
                    CreateListingController.listing.ebay_subCategory = card.selectedData._id;
                    addUploadImageCard();
                }
            }else if (card.type == "uploadImage") {
                CreateListingController.listing.image = card.selectedData;
                addNewListingCard(card.selectedData);
            }
            else if (card.type == "newListing") {
                var cards = CreateListingController.listing.cards;
                CreateListingController.listing = angular.copy(card.selectedData);
                CreateListingController.listing['cards'] = cards;
                postListing(card.selectedData);
            }
        }


        function postListing(listing) {
            ProgressBarFactory.showProgressBar();
            var publishListingCard = {
                type: "publishListing",
                data: [],
                selectedData: ""
            };

            ListingService.publishListing(listing)
                .then(success_callback, error_callback);
            function success_callback(response) {
                console.log(response.data);
                publishListingCard.data = response.data;
                ProgressBarFactory.hideProgressBar();
                console.log(publishListingCard);
                CreateListingController.listing.cards.push(publishListingCard);
            }

            function error_callback(error) {
                console.log(error);
                ProgressBarFactory.hideProgressBar();
            }

        }

        function addUploadImageCard() {
            ProgressBarFactory.showProgressBar();
            var uploadImageCard = {
                type: "uploadImage",
                data: [],
                selectedData: ""
            };
            CreateListingController.listing.cards.push(uploadImageCard);
            ProgressBarFactory.hideProgressBar();
        }

        function addNewListingCard() {
            ProgressBarFactory.showProgressBar();
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
                title: CreateListingController.listing.title,
                description: CreateListingController.listing.description,
                model: CreateListingController.listing.model,
                mpn: CreateListingController.listing.mpn,
                ebay_ebayListingId: CreateListingController.listing.ebay_ebayListingId,
                ebay_listingType: CreateListingController.listing.ebay_listingType,
                ebay_paymentMethod: CreateListingController.listing.ebay_paymentMethod,
                ebay_returnPolicyEnabled: CreateListingController.listing.ebay_returnPolicyEnabled,
                ebay_listingDuration: CreateListingController.listing.ebay_listingDuration,
                ebay_parentCategory: CreateListingController.listing.ebay_parentCategory,
                ebay_subCategory: CreateListingController.listing.ebay_subCategory,
                ebay_itemCondition: CreateListingController.listing.itemCondition
            };
            ListingService
                .getNewListingTemplate(newListing)
                .then(success_callback, error_callback);
            function success_callback(response) {
                console.log(response.data);
                newListingCard.data = response.data;
                ProgressBarFactory.hideProgressBar();
                console.log(newListingCard);
                CreateListingController.listing.cards.push(newListingCard);
            }

            function error_callback(error) {
                console.log(error);
                ProgressBarFactory.hideProgressBar();
            }


        }

        function addSubCategoryCard(parentCategoryId) {
            ProgressBarFactory.showProgressBar();
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
                console.log(subCategoryCard);
                CreateListingController.listing.cards.push(subCategoryCard);
            }

            function error_callback(error) {
                console.log(error);
                ProgressBarFactory.hideProgressBar();
            }


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
                ebay_ebayListingId: "",
                ebay_itemCondition: "",
                ebay_listingType: "",
                ebay_paymentMethod: "",
                ebay_returnPolicyEnabled: "",
                ebay_listingDuration: "",
                ebay_parentCategory: "",
                ebay_subCategory: ""
            };
            console.log(newListing);
            CreateListingController.listing = newListing;
        }

        function addCategoryCard() {
            ProgressBarFactory.showProgressBar();
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
                console.log(categoryCard);
                CreateListingController.listing.cards.push(categoryCard);
            }

            function error_callback(error) {
                console.log(error);
                ProgressBarFactory.hideProgressBar();
            }


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