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
            console.log(flow);
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
                CreateListingController.flow = "direct";
                initNewDirectListing();
            } else if (flow == "prod" && $rootScope.prodListing) {
                CreateListingController.product = $rootScope.prodListing;
                CreateListingController.flow = flow;
                initNewProdListing();
            } else if (flow == "prod" && !$rootScope.prodListing) {
                CreateListingController.flow = "direct";
                initNewDirectListing();
            } else if (flow == 'image') {
                CreateListingController.flow = "image";
                initNewImageListingCard();
            }
        }

        init();

        /*Event Handler Decelerations*/
        CreateListingController.apply = apply;

        function apply(card) {
            console.log(card);
            if (card.type == "provider" && CreateListingController.flow == "direct") {
                CreateListingController.listing.providerId = card.selectedData.code;
                clearOtherCards(card.type);
                addCategoryCard();
            } else if (card.type == "provider" && CreateListingController.flow == "prod") {
                clearOtherCards(card.type);
                getProdListingTemplate(card.selectedData.code);
            } else if (card.type == "provider" && CreateListingController.flow == "image") {
                CreateListingController.listing.providerId = card.selectedData.code;
                clearOtherCards(card.type);
                addUploadImageCard();
            } else if (card.type == "parentCategory") {
                CreateListingController.listing.ebay.parentCategory.code = card.selectedData._id;
                CreateListingController.listing.ebay.parentCategory.name = card.selectedData.name;
                clearOtherCards(card.type);
                addSubCategoryCard(card.selectedData._id);
            } else if (card.type == "subCategory") {
                if (!card.selectedData.leaf) {
                    console.log("Not Leaf Category.");
                    clearOtherCards(card.type);
                    addSubCategoryCard(card.selectedData._id)
                } else if (CreateListingController.flow == "image") {
                    console.log("Leaf Category. Image Flow.");
                    CreateListingController.listing.ebay.subCategory.code = card.selectedData._id;
                    CreateListingController.listing.ebay.subCategory.name = card.selectedData.name;
                    clearOtherCards(card.type);
                    addOtherDetailsCardWithoutImagePost();
                } else {
                    console.log("Leaf Category.");
                    CreateListingController.listing.ebay.subCategory.code = card.selectedData._id;
                    CreateListingController.listing.ebay.subCategory.name = card.selectedData.name;
                    clearOtherCards(card.type);
                    addUploadImageCard();
                }
            } else if (card.type == "uploadImage") {

                if (CreateListingController.flow == 'image') {
                    CreateListingController.listing.image = card.selectedData;
                    clearOtherCards(card.type);
                    getImageListingTemplate();
                } else {
                    CreateListingController.listing.image = card.selectedData;
                    clearOtherCards(card.type);
                    addOtherDetailsCardWithPost();
                }

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

        function addOtherDetailsCardWithoutImagePost() {
            ProgressBarFactory.showProgressBar();
            var otherDetailsCard = {
                type: "otherDetails",
                data: [],
                selectedData: "",
                header: ""
            };
            ListingService
                .addCategory(CreateListingController.listing)
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

        function initNewProdListing() {
            console.log("initNewProdListing");
            ProgressBarFactory.showProgressBar();
            addProviderCard();
        }


        function getImageListingTemplate() {
            console.log("getImageListingTemplate");
            var subCategoryCard = {
                type: "subCategory",
                data: [],
                selectedData: "",
                header: ""
            };
            ProgressBarFactory.showProgressBar();
            console.log(CreateListingController.listing);
            ListingService.getImageListingTemplate(CreateListingController.listing)
                .then(function (response) {
                    console.log(response.data);
                    subCategoryCard.data = response.data.suggestedCategories;
                    ProgressBarFactory.hideProgressBar();
                    console.log(subCategoryCard);
                    CreateListingController.cards.push(subCategoryCard);
                    CreateListingController.listing = response.data.listing;
                    console.log(CreateListingController.listing);
                }, function (err) {
                    console.log(err);
                    ProgressBarFactory.hideProgressBar();
                })
        }

        function getProdListingTemplate(providerId) {
            console.log("getProdListingTemplate");
            ProgressBarFactory.showProgressBar();
            console.log(CreateListingController.product);
            var product = CreateListingController.product;
            product.userId = $rootScope.user._id;
            product.providerId = providerId;
            //Getting New Listing Template
            ListingService.getProdListingTemplate(product)
                .then(function (response) {
                    console.log(response.data);
                    CreateListingController.listing = response.data;
                    addOtherDetailsCard(response.data);
                }, function (err) {
                    console.log(err);
                });
        }

        function initNewImageListingCard() {
            console.log("initNewImageListingCard");
            ProgressBarFactory.showProgressBar();
            CreateListingController.listing = {
                userId: $rootScope.user._id,
                providerId: "",
                image: "",
                flow: "image"
            };
            addProviderCard();
        }

        function initNewDirectListing() {
            console.log("initNewDirectListing");
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