/**
 * Created by Bhanu on 11/03/2016.
 */

"use strict";
(function () {
    angular
        .module("GluecApp")
        .controller("CreateListingController", CreateListingController);

    function CreateListingController(CategoryService, ProgressBarFactory, ListingService, $rootScope, $location, $timeout, ProviderService, $routeParams) {

        var CreateListingController = this;
        var flow = $routeParams.flow;

        function init() {
            if (!$rootScope.user) {
                $location.url("/login");
                return
            }

            if (flow == "direct") {
                CreateListingController.flow = flow;
                initNewDirectListing();
            } else if (flow == "similar" && $rootScope.similarlisting) {
                CreateListingController.flow = flow;
                initNewSimilarListing($rootScope.similarlisting);
            } else if (flow == "similar" && !$rootScope.similarlisting) {
                CreateListingController.flow = flow;
                initNewDirectListing();
            }
        }

        init();

        /*Event Handler Decelerations*/
        CreateListingController.apply = apply;

        function apply(card) {
            console.log(card);
            if (card.type == "provider") {
                CreateListingController.listing.providerId = card.selectedData.code;
                clearOtherCards(card.type);
                addCategoryCard();
            }
            else if (card.type == "parentCategory") {
                CreateListingController.listing.ebay.parentCategoryId = card.selectedData._id;
                CreateListingController.listing.ebay.parentCategoryName = card.selectedData.name;
                clearOtherCards(card.type);
                addSubCategoryCard(card.selectedData._id);
            } else if (card.type == "subCategory") {
                if (!card.selectedData.leaf) {
                    console.log("Not Leaf Category.");
                    clearOtherCards(card.type);
                    addSubCategoryCard(card.selectedData._id)
                } else {
                    console.log("Leaf Category.");
                    CreateListingController.listing.ebay.subCategoryId = card.selectedData._id;
                    CreateListingController.listing.ebay.subCategoryName = card.selectedData.name;
                    clearOtherCards(card.type);
                    addUploadImageCard();
                }
            } else if (card.type == "uploadImage") {
                CreateListingController.listing.image = card.selectedData;
                clearOtherCards(card.type);
                addOtherDetailsCardWithPost(card.selectedData);
            }
            else if (card.type == "otherDetails") {
                CreateListingController.listing = angular.copy(card.selectedData);
                clearOtherCards(card.type);
                postListing(card.selectedData);
            }
        }

        function clearOtherCards(cardType) {
            var cards = CreateListingController.cards;
            var newCards = [];
            if (cardType == "provider") {
                for (var i in cards) {
                    if (cards[i].type == 'provider') {
                        newCards.push(cards[i]);
                    }
                }
            }
            else if (cardType == "parentCategory") {
                for (var i in cards) {
                    if (cards[i].type == 'provider' || cards[i].type == 'parentCategory') {
                        newCards.push(cards[i]);
                    }
                }
            } else if (cardType == "subCategory") {
                for (var i in cards) {
                    if (cards[i].type == 'provider' ||
                        cards[i].type == 'parentCategory' ||
                        cards[i].type == 'subCategory') {
                        newCards.push(cards[i]);
                    }
                }
            } else if (cardType == "uploadImage") {
                for (var i in cards) {
                    if (cards[i].type == 'provider'
                        || cards[i].type == 'parentCategory'
                        || cards[i].type == 'subCategory'
                        || cards[i].type == 'uploadImage') {
                        newCards.push(cards[i]);
                    }
                }
            }
            else if (cardType == "otherDetails") {
                for (var i in cards) {
                    if (cards[i].type == 'provider'
                        || cards[i].type == 'parentCategory'
                        || cards[i].type == 'subCategory'
                        || cards[i].type == 'uploadImage'
                        || cards[i].type == 'otherDetails') {
                        newCards.push(cards[i]);
                    }
                }
            }
            CreateListingController.cards = newCards;
        }


        function postListing(listing) {
            ProgressBarFactory.showProgressBar();
            var publishListingCard = {
                type: "publishListing",
                data: [],
                selectedData: "",
                header: ""
            };

            ListingService.publishListing(listing)
                .then(success_callback, error_callback);
            function success_callback(response) {
                console.log(response.data);
                publishListingCard.data = response.data;
                ProgressBarFactory.hideProgressBar();
                console.log(publishListingCard);
                CreateListingController.cards.push(publishListingCard);
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
                selectedData: "",
                header: ""
            };
            CreateListingController.cards.push(uploadImageCard);
            ProgressBarFactory.hideProgressBar();
        }

        function addOtherDetailsCard(data) {
            ProgressBarFactory.showProgressBar();
            var otherDetailsCard = {
                type: "otherDetails",
                data: [],
                selectedData: "",
                header: ""
            };
            console.log(data);
            otherDetailsCard.data = data;
            ProgressBarFactory.hideProgressBar();
            console.log(otherDetailsCard);
            CreateListingController.cards = [otherDetailsCard];
        }

        function addOtherDetailsCardWithPost() {
            ProgressBarFactory.showProgressBar();
            var otherDetailsCard = {
                type: "otherDetails",
                data: [],
                selectedData: "",
                header: ""
            };
            ListingService
                .addImageAndCategory(CreateListingController.listing)
                .then(success_callback, error_callback);
            function success_callback(response) {
                console.log(response.data);
                otherDetailsCard.data = response.data;
                ProgressBarFactory.hideProgressBar();
                console.log(otherDetailsCard);
                CreateListingController.cards.push(otherDetailsCard);
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
                selectedData: "",
                header: ""
            };
            CategoryService
                .getSubCategories(CreateListingController.listing.providerId, parentCategoryId)
                .then(success_callback, error_callback);
            function success_callback(response) {
                console.log(response.data);
                subCategoryCard.data = response.data;
                ProgressBarFactory.hideProgressBar();
                console.log(subCategoryCard);
                CreateListingController.cards.push(subCategoryCard);
            }

            function error_callback(error) {
                console.log(error);
                ProgressBarFactory.hideProgressBar();
            }


        }

        function initNewDirectListing() {
            ProgressBarFactory.showProgressBar();
            var newListing = {
                userId: $rootScope.user._id
            };
            //Getting New Listing Template
            ListingService.getDirectListingTemplate(newListing)
                .then(function (response) {
                    console.log(response.data);
                    CreateListingController.listing = response.data;
                    addProviderCard();
                }, function (err) {
                    console.log(err);
                });
        }

        function initNewSimilarListing(listing) {
            ProgressBarFactory.showProgressBar();
            listing.userId = $rootScope.user._id;
            ListingService.getSimilarListingTemplate($rootScope.similarlisting)
                .then(function (response) {
                    console.log(response.data);
                    CreateListingController.listing = response.data;
                    addOtherDetailsCard(response.data);
                }, function (err) {
                    console.log(err);
                });

        }

        function addProviderCard() {
            var providerCard = {
                type: "provider",
                data: [],
                selectedData: "",
                header: ""
            };
            ProviderService.getProvidersForUser($rootScope.user._id)
                .then(function (response) {
                        console.log(response);
                        providerCard.data = response.data;
                        ProgressBarFactory.hideProgressBar();
                        console.log(providerCard);
                        CreateListingController.cards = [providerCard];
                    }, function (err) {
                        console.log(err)
                    }
                )
            ;
        }

        function addCategoryCard() {
            ProgressBarFactory.showProgressBar();
            var categoryCard = {
                type: "parentCategory",
                data: [],
                selectedData: "",
                header: ""
            };
            CategoryService
                .getTopLevelCategories(CreateListingController.listing.providerId)
                .then(success_callback, error_callback);
            function success_callback(response) {
                console.log(response.data);
                categoryCard.data = response.data;
                ProgressBarFactory.hideProgressBar();
                console.log(categoryCard);
                CreateListingController.cards.push(categoryCard);
            }

            function error_callback(error) {
                console.log(error);
                ProgressBarFactory.hideProgressBar();
            }


        }

    }
})
();