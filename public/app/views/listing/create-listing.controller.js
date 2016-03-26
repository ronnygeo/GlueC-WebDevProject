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
            initCategoryCard();
        }

        init();

        function initCategoryCard() {
            var cardType = "category";
            var newListing = {
                category: "",
                cards: [
                    {
                        type: cardType,
                        data: []
                    }
                ]
            };

            CategoryService
                .getTopLevelCategories(10001)
                .then(success_callback, error_callback);
            function success_callback(response) {
                console.log(response.data);
                newListing.cards[0].data = response.data;
                ProgressBarFactory.hideProgressBar();
            }

            function error_callback(error) {
                console.log(error);
                ProgressBarFactory.hideProgressBar();
            }

            console.log(newListing);
            CreateListingController.listing = newListing;
        }

        function creteNewCard(cardType) {
            var card =
                {
                    type: cardType,
                    data: getCardData(cardType)
                }
                ;
            CreateListingController.newListing.cards.push(card);
        }


        function getCardData(cardType) {
            if (cardType == "category") {
                return getCategoryData();
            }
        }

        function getCategoryData() {
            //getEbayCategories()
            var categories = [{
                "_id": 87,
                "parentId": 123,
                "level": 1,
                "name": "Samrtphone"
            },
                {
                    "_id": 90,
                    "parentId": 123,
                    "level": 1,
                    "name": "Laptop"
                }
            ]

            return categories;
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