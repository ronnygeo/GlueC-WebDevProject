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
            fetchSubCategories: fetchSubCategoriesFromEbay
        }
    };
    return api;

    function getFeaturesForCategory(req, res) {
        console.log("Inside CategoryService.getFeaturesForCategory");
        var subCategoryId = req.params.subCategoryId;

        if (req.params.providerId == "10001") {
            categoryModel.ebay
                .getFeaturesForCategory(subCategoryId)
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

};