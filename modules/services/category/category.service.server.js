/**
 * Created by Bhanu on 26/03/2016.
 */

module.exports = function (app, categoryModel, q, ebayAPIClient) {

    app.get("/api/getTopLevelCategories/:providerId", getTopLevelCategories);
    app.get("/api/getSubCategories/:providerId/:parentCategoryId", getSubCategories);
    app.get("/api/getDetailsForCategory/:providerId/:subCategoryId", getFeaturesForCategory);


    var api = {
        ebay: {
            fetchTopCategories: fetchTopCategoriesFromEbay,
            fetchSubCategories: fetchSubCategoriesFromEbay,
            fetchCategoryDetails: fetchCategoryDetailsFromEbay,
            filterLeafCategories: filterLeafCategories,
            getSuggestedCategories: getSuggestedCategories
        },
        processToGluecFormat: processToGluecFormat

    };
    return api;

    function getSuggestedCategories(keywordString) {
        console.log("Category Service, getSuggestedCategories");
        var deferred = q.defer();
        var functionToCall = "GetSuggestedCategories";
        var requestData = '<?xml version="1.0" encoding="utf-8"?>' +
            '<GetSuggestedCategoriesRequest xmlns="urn:ebay:apis:eBLBaseComponents">' +
            '<RequesterCredentials>' +
            '<eBayAuthToken>' +
            ebayAPIClient.trading.PRD_AUTH_TOKEN +
            '</eBayAuthToken>' +
            '</RequesterCredentials>' +
            '<Query>' + keywordString + '</Query>' +
            '<WarningLevel>High</WarningLevel>' +
            '</GetSuggestedCategoriesRequest>';
        ebayAPIClient.trading.functionPRD(functionToCall, requestData)
            .then(function (response) {
                console.log(response.GetSuggestedCategoriesResponse.SuggestedCategoryArray[0].SuggestedCategory);
                deferred.resolve(mapSuggestedCategories(response.GetSuggestedCategoriesResponse.SuggestedCategoryArray[0].SuggestedCategory));
            }, function (err) {
                console.log(err);
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function processToGluecFormat(categories) {
        var processedCategories = [];
        for (var catIndex in categories) {
            processedCategories.push({
                code: categories[catIndex]._id,
                name: categories[catIndex].name
            })
        }
        return processedCategories;
    }

    function filterLeafCategories(categories) {
        var filteredCategories = [];
        for (var catIndex in categories) {
            if ('leaf' in categories[catIndex] && categories[catIndex].leaf) {
                filteredCategories.push(categories[catIndex])
            }
        }
        return filteredCategories;
    }

    function getFeaturesForCategory(req, res) {
        console.log("Inside CategoryService.getFeaturesForCategory");
        var subCategoryId = req.params.subCategoryId;

        if (req.params.providerId == "10001") {
            fetchCategoryDetailsFromEbay(subCategoryId)
                .then(success_callback, error_callback);
            function success_callback(response) {
                console.log(response);
                res.json(response);
            }

            function error_callback(error) {
                console.log(error);
                res.statusCode(404).send(err);
            }
        }
    }

    function getSubCategories(req, res) {
        if (req.params.providerId == "10001") {
            fetchSubCategoriesFromEbay(req.params.parentCategoryId)
                .then(success_callback, error_callback);

            function success_callback(response) {
                console.log(response);
                res.json(response);
            }

            function error_callback(error) {
                console.log(error);
                res.statusCode(404).send(err);
            }
        }

    }

    function getTopLevelCategories(req, res) {
        if (req.params.providerId == "10001") {
            fetchTopCategoriesFromEbay()
                .then(success_callback, error_callback);

            function success_callback(response) {
                console.log(response);
                res.json(response);
            }

            function error_callback(error) {
                console.log(error);
                res.statusCode(404).send(err);
            }
        }
    }

    function fetchTopCategoriesFromEbay() {
        var deferred = q.defer();
        var functionToCall = "GetCategories";
        var requestData = '<?xml version="1.0" encoding="utf-8"?>' +
            '<GetCategoriesRequest xmlns="urn:ebay:apis:eBLBaseComponents">' +
            '<RequesterCredentials>' +
            '<eBayAuthToken>' +
            ebayAPIClient.trading.AUTH_TOKEN +
            '</eBayAuthToken>' +
            '</RequesterCredentials>' +
            '<CategorySiteID>' + 0 + '</CategorySiteID>' +
            '<DetailLevel>ReturnAll</DetailLevel>' +
            '<LevelLimit>' + 1 + '</LevelLimit>' +
            '</GetCategoriesRequest>';

        ebayAPIClient.trading.function(functionToCall, requestData)
            .then(function (response) {
                console.log(response.GetCategoriesResponse.CategoryArray[0].Category);
                var incomingCatArray = response.GetCategoriesResponse.CategoryArray[0].Category;
                deferred.resolve(mapCategories(incomingCatArray));
            }, function (err) {
                console.log(err);
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function fetchSubCategoriesFromEbay(parentCategoryId) {
        var deferred = q.defer();
        var functionToCall = "GetCategories";
        var requestData = '<?xml version="1.0" encoding="utf-8"?>' +
            '<GetCategoriesRequest xmlns="urn:ebay:apis:eBLBaseComponents">' +
            '<RequesterCredentials>' +
            '<eBayAuthToken>' +
            ebayAPIClient.trading.AUTH_TOKEN +
            '</eBayAuthToken>' +
            '</RequesterCredentials>' +
            '<CategoryParent>' + parentCategoryId + '</CategoryParent>' +
            '<DetailLevel>ReturnAll</DetailLevel>' +
            '</GetCategoriesRequest>';

        ebayAPIClient.trading.function(functionToCall, requestData)
            .then(function (response) {
                console.log(response.GetCategoriesResponse.CategoryArray[0].Category);
                var incomingCatArray = response.GetCategoriesResponse.CategoryArray[0].Category;
                deferred.resolve(mapCategories(incomingCatArray));
            }, function (err) {
                console.log(err);
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function mapSuggestedCategories(incomingCatArray) {
        var categories = [];
        for (var catindex in incomingCatArray) {
            //console.log(incomingCatArray[catindex].Category);
            var cat = {
                "_id": incomingCatArray[catindex].Category[0].CategoryID[0],
                "parentId": incomingCatArray[catindex].Category[0].CategoryParentID[0],
                "name": incomingCatArray[catindex].Category[0].CategoryName[0],
                "leaf": true
            };
            categories.push(cat);
        }
        return categories;
    }

    function mapCategories(incomingCatArray) {
        console.log(incomingCatArray);
        var categories = [];
        for (var catindex in incomingCatArray) {
            var leafCategory = false;
            if ('LeafCategory' in incomingCatArray[catindex]) {
                leafCategory = true;
            }
            var cat = {
                "_id": incomingCatArray[catindex].CategoryID[0],
                "parentId": incomingCatArray[catindex].CategoryParentID[0],
                "level": incomingCatArray[catindex].CategoryLevel[0],
                "name": incomingCatArray[catindex].CategoryName[0],
                "leaf": leafCategory
            };
            categories.push(cat);
        }
        return categories;
    }


    function fetchCategoryDetailsFromEbay(subCategoryId) {
        var deferred = q.defer();
        var functionToCall = "GetCategoryFeatures";
        var requestData = '<?xml version="1.0" encoding="utf-8"?>' +
            '<GetCategoryFeaturesRequest  xmlns="urn:ebay:apis:eBLBaseComponents">' +
            '<RequesterCredentials>' +
            '<eBayAuthToken>' +
            ebayAPIClient.trading.AUTH_TOKEN +
            '</eBayAuthToken>' +
            '</RequesterCredentials>' +
            '<WarningLevel>High</WarningLevel>' +
            '<CategoryID>' + subCategoryId + '</CategoryID>' +
            '<DetailLevel>ReturnAll</DetailLevel>' +
            '<ViewAllNodes >True</ViewAllNodes >' +
            '<AllFeaturesForCategory >True</AllFeaturesForCategory >' +
            '</GetCategoryFeaturesRequest>';
        ebayAPIClient.trading.function(functionToCall, requestData)
            .then(function (response) {
                console.log(response.GetCategoryFeaturesResponse.Category[0]);
                deferred.resolve(mapCategoryDetails(response.GetCategoryFeaturesResponse.Category[0]));
            }, function (err) {
                console.log(err);
                deferred.reject(err);
            });
        return deferred.promise;

    }

    function mapCategoryDetails(categoryDetails) {

        /*Map Listing Duration*/
        var listingDuration = categoryDetails.ListingDuration;
        var newListingDuration = [];
        for (var index in listingDuration) {
            var dur = listingDuration[index]._;
            console.log(dur);
            newListingDuration.push(dur)
        }
        console.log(newListingDuration);

        /*Map Condition*/
        var conditionArray = categoryDetails.ConditionValues[0].Condition;
        var newConsitionArray = [];
        for (var i in conditionArray) {
            newConsitionArray.push(
                {
                    'DisplayName': conditionArray[i].DisplayName[0],
                    'ID': conditionArray[i].ID[0]
                }
            )
        }
        console.log(newConsitionArray);

        categoryDetails.ListingDuration = newListingDuration;
        categoryDetails.ConditionValues = newConsitionArray;

        return categoryDetails;

    }


};