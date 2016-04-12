/**
 * Created by Bhanu on 26/03/2016.
 */
var Client = require('node-rest-client').Client;
var parseString = require('xml2js').parseString;
module.exports = function (q, uuid, request) {

    var api = {
        ebay: {
            getTopLevelCategories: getTopLevelCategories,
            getSubCategories: getSubCategories,
            getFeaturesForCategory: getFeaturesForCategory
        }
    };
    return api;

    function getFeaturesForCategory(subCategoryId) {
        console.log("Inside CategoryModel.getFeaturesForCategory");
        var deferred = q.defer();
        var client = new Client();
        var AUTH_TOKEN = "AgAAAA**AQAAAA**aAAAAA**c7T2Vg**nY+sHZ2PrBmdj6" +
            "wVnY+sEZ2PrA2dj6wFk4GgCJKGpgmdj6x9nY+seQ**wLoDAA**AAMAAA**x/Gtrt" +
            "seUtyAUFKSaAgYmUr/v6rzYScwiH3vyXPmZmyif5+M7P+N3rrc1EzMvGCwR4TKDRKD/RXM6tBOm8/gqr" +
            "LoLI25EbdQzY5HOD5I41cc/xzHsk9NAWniCa/SRFQmfShD35aU+WgaP1bHg6BFdurSLYjpf58VEo75Ccv7xi" +
            "y8wCfBoaCeLIgHv+HkU66JWQs+9acVgXkvodAUtLEOu7yRPVVa7yIMvgi7Xn7xDCBt5cN2RW9F9nVhctz1eisPW26" +
            "WpnFhfs3nDYrswxTiW2VfE3GbxHdxSTuj3et5kGGv0xTeHIoFeUoTqBKwhPMlVFXDwdL3e9QPXCMroOs6A+j4e2Lp" +
            "itShneoZHRVoj7q6AEyH50ZA9lMwlAogBAwCiuKfQ+TRBmGig4jFEV647MVkcFa4xmzTi0agHnuLLDFeJGpyA7osp8wu" +
            "VWiG3dVNhpZybAV/+ge8t3iv30o1P1g5eXa2xEIeUpkZmmoefN0IFvyDd5CT8YznZUz9G4l2wBEUAbHCO4wGKBFydulkrk0" +
            "RAmbeZslxKpoVAjxT3x5m1ZDyVOfc8jHP3exfUrB+D5oqPmjUBpPlVAtY23WKZpsCdKjlxEgDF/d8DJQ+7h6grKp7TWZI8Q1P" +
            "TujQku1ySZT5w1qON6rIJB/hIPLzX6XMVefwZWD31VEaXotxpUxqSWL6x6Zj3MBB4s1LjEWXr9jH2A1ukPR+cdRrX6Q3vKQRy19" +
            "rwuQPB/7qQpdr4Hn61ByLnr9bXpAPChqNmAlD";

        var args = {
            headers: {
                "X-EBAY-API-COMPATIBILITY-LEVEL": 909,
                "X-EBAY-API-DEV-NAME": "b4800ef5-265c-4b24-863e-99bdc92c3ec5",
                "X-EBAY-API-APP-NAME": "BhanuJai-Gluec-SBX-c38c4f481-f1f53a35",
                "X-EBAY-API-CERT-NAME": "SBX-38c4f481ab0e-b034-4a34-8a55-317e",
                "X-EBAY-API-SITEID": 0,
                "X-EBAY-API-CALL-NAME": "GetCategoryFeatures"
            },
            data: '<?xml version="1.0" encoding="utf-8"?>' +
            '<GetCategoryFeaturesRequest  xmlns="urn:ebay:apis:eBLBaseComponents">' +
            '<RequesterCredentials>' +
            '<eBayAuthToken>' +
            AUTH_TOKEN +
            '</eBayAuthToken>' +
            '</RequesterCredentials>' +
            '<WarningLevel>High</WarningLevel>' +
            '<CategoryID>' + subCategoryId + '</CategoryID>' +
            '<DetailLevel>ReturnAll</DetailLevel>' +
            '<FeatureID>ConditionValues</FeatureID>' +
            '<FeatureID>ListingDurations</FeatureID>' +
            '<FeatureID>HandlingTimeEnabled</FeatureID>' +
            '<FeatureID>MaxFlatShippingCost</FeatureID>' +
            '<FeatureID>PayPalRequired</FeatureID>' +
            '<FeatureID>BestOfferEnabled</FeatureID>' +
            '<FeatureID>ReturnPolicyEnabled</FeatureID>'+
            '</GetCategoryFeaturesRequest>',
            requestConfig: {
                timeout: 1000, //request timeout in milliseconds
                noDelay: true, //Enable/disable the Nagle algorithm
                keepAlive: true, //Enable/disable keep-alive functionalityidle socket.
                keepAliveDelay: 1000 //and optionally set the initial delay before the first keepalive probe is sent
            },
            responseConfig: {
                timeout: 1000 //response timeout
            },
            mimetypes: {
                xml: ["application/xml", "application/xml;charset=utf-8"]
            }

        };
        console.log("Calling Ebay Service");
        client.post("https://api.sandbox.ebay.com/ws/api.dll", args, function (data, response) {
            if (Buffer.isBuffer(data)) {
                data = data.toString('utf8');
                console.log(data);
                parseString(data, function (err, result) {
                    console.log(result);

                });

            }
        }).on('error', function (err) {
            console.log('something went wrong on the request ' + err.request.options);
            deferred.reject(err);
        });

        client.on('error', function (err) {
            console.error('Something went wrong on the client ' + err);
            deferred.reject(err);
        });

        return deferred.promise;
    }

    function getSubCategories(parentCategoryId) {

        var deferred = q.defer();
        var client = new Client();
        var AUTH_TOKEN = "AgAAAA**AQAAAA**aAAAAA**c7T2Vg**nY+sHZ2PrBmdj6" +
            "wVnY+sEZ2PrA2dj6wFk4GgCJKGpgmdj6x9nY+seQ**wLoDAA**AAMAAA**x/Gtrt" +
            "seUtyAUFKSaAgYmUr/v6rzYScwiH3vyXPmZmyif5+M7P+N3rrc1EzMvGCwR4TKDRKD/RXM6tBOm8/gqr" +
            "LoLI25EbdQzY5HOD5I41cc/xzHsk9NAWniCa/SRFQmfShD35aU+WgaP1bHg6BFdurSLYjpf58VEo75Ccv7xi" +
            "y8wCfBoaCeLIgHv+HkU66JWQs+9acVgXkvodAUtLEOu7yRPVVa7yIMvgi7Xn7xDCBt5cN2RW9F9nVhctz1eisPW26" +
            "WpnFhfs3nDYrswxTiW2VfE3GbxHdxSTuj3et5kGGv0xTeHIoFeUoTqBKwhPMlVFXDwdL3e9QPXCMroOs6A+j4e2Lp" +
            "itShneoZHRVoj7q6AEyH50ZA9lMwlAogBAwCiuKfQ+TRBmGig4jFEV647MVkcFa4xmzTi0agHnuLLDFeJGpyA7osp8wu" +
            "VWiG3dVNhpZybAV/+ge8t3iv30o1P1g5eXa2xEIeUpkZmmoefN0IFvyDd5CT8YznZUz9G4l2wBEUAbHCO4wGKBFydulkrk0" +
            "RAmbeZslxKpoVAjxT3x5m1ZDyVOfc8jHP3exfUrB+D5oqPmjUBpPlVAtY23WKZpsCdKjlxEgDF/d8DJQ+7h6grKp7TWZI8Q1P" +
            "TujQku1ySZT5w1qON6rIJB/hIPLzX6XMVefwZWD31VEaXotxpUxqSWL6x6Zj3MBB4s1LjEWXr9jH2A1ukPR+cdRrX6Q3vKQRy19" +
            "rwuQPB/7qQpdr4Hn61ByLnr9bXpAPChqNmAlD";

        var args = {
            headers: {
                "X-EBAY-API-COMPATIBILITY-LEVEL": 909,
                "X-EBAY-API-DEV-NAME": "b4800ef5-265c-4b24-863e-99bdc92c3ec5",
                //"X-EBAY-API-DEV-NAME": "8907a679-bbd0-4ac0-aa35-7b350e9496a1",
                "X-EBAY-API-APP-NAME": "BhanuJai-Gluec-SBX-c38c4f481-f1f53a35",
                //"X-EBAY-API-APP-NAME": "6ef7bb86-02ad-45b3-9a01-f00e0e8c7d26",
                "X-EBAY-API-CERT-NAME": "SBX-38c4f481ab0e-b034-4a34-8a55-317e",
                //"X-EBAY-API-CERT-NAME": "62d7919c-bfc5-449d-9832-96a29f17ca15",
                "X-EBAY-API-SITEID": 0,
                "X-EBAY-API-CALL-NAME": "GetCategories"
            },
            data: '<?xml version="1.0" encoding="utf-8"?>' +
            '<GetCategoriesRequest xmlns="urn:ebay:apis:eBLBaseComponents">' +
            '<RequesterCredentials>' +
            '<eBayAuthToken>' +
            AUTH_TOKEN +
            '</eBayAuthToken>' +
            '</RequesterCredentials>' +
            '<CategoryParent>' + parentCategoryId + '</CategoryParent>' +
            '<DetailLevel>ReturnAll</DetailLevel>' +
            '<LevelLimit>2</LevelLimit>' +
            '</GetCategoriesRequest>',
            requestConfig: {
                timeout: 1000, //request timeout in milliseconds
                noDelay: true, //Enable/disable the Nagle algorithm
                keepAlive: true, //Enable/disable keep-alive functionalityidle socket.
                keepAliveDelay: 1000 //and optionally set the initial delay before the first keepalive probe is sent
            },
            responseConfig: {
                timeout: 1000 //response timeout
            },
            mimetypes: {
                xml: ["application/xml", "application/xml;charset=utf-8"]
            }

        };

        console.log("Calling Ebay Service");
        client.post("https://api.sandbox.ebay.com/ws/api.dll", args, function (data, response) {
            if (Buffer.isBuffer(data)) {
                data = data.toString('utf8');
                console.log(data);
                parseString(data, function (err, result) {
                    console.log(result);
                    var incomingCatArray = result.GetCategoriesResponse.CategoryArray[0].Category;

                    deferred.resolve(mapCategories(incomingCatArray));

                });

            }
        }).on('error', function (err) {
            console.log('something went wrong on the request ' + err.request.options);
            deferred.reject(err);
        });

        client.on('error', function (err) {
            console.error('Something went wrong on the client ' + err);
            deferred.reject(err);
        });

        return deferred.promise;
    }

    function getTopLevelCategories() {
        var deferred = q.defer();
        var client = new Client();
        var AUTH_TOKEN = "AgAAAA**AQAAAA**aAAAAA**c7T2Vg**nY+sHZ2PrBmdj6" +
            "wVnY+sEZ2PrA2dj6wFk4GgCJKGpgmdj6x9nY+seQ**wLoDAA**AAMAAA**x/Gtrt" +
            "seUtyAUFKSaAgYmUr/v6rzYScwiH3vyXPmZmyif5+M7P+N3rrc1EzMvGCwR4TKDRKD/RXM6tBOm8/gqr" +
            "LoLI25EbdQzY5HOD5I41cc/xzHsk9NAWniCa/SRFQmfShD35aU+WgaP1bHg6BFdurSLYjpf58VEo75Ccv7xi" +
            "y8wCfBoaCeLIgHv+HkU66JWQs+9acVgXkvodAUtLEOu7yRPVVa7yIMvgi7Xn7xDCBt5cN2RW9F9nVhctz1eisPW26" +
            "WpnFhfs3nDYrswxTiW2VfE3GbxHdxSTuj3et5kGGv0xTeHIoFeUoTqBKwhPMlVFXDwdL3e9QPXCMroOs6A+j4e2Lp" +
            "itShneoZHRVoj7q6AEyH50ZA9lMwlAogBAwCiuKfQ+TRBmGig4jFEV647MVkcFa4xmzTi0agHnuLLDFeJGpyA7osp8wu" +
            "VWiG3dVNhpZybAV/+ge8t3iv30o1P1g5eXa2xEIeUpkZmmoefN0IFvyDd5CT8YznZUz9G4l2wBEUAbHCO4wGKBFydulkrk0" +
            "RAmbeZslxKpoVAjxT3x5m1ZDyVOfc8jHP3exfUrB+D5oqPmjUBpPlVAtY23WKZpsCdKjlxEgDF/d8DJQ+7h6grKp7TWZI8Q1P" +
            "TujQku1ySZT5w1qON6rIJB/hIPLzX6XMVefwZWD31VEaXotxpUxqSWL6x6Zj3MBB4s1LjEWXr9jH2A1ukPR+cdRrX6Q3vKQRy19" +
            "rwuQPB/7qQpdr4Hn61ByLnr9bXpAPChqNmAlD";

        var args = {
            headers: {
                "X-EBAY-API-COMPATIBILITY-LEVEL": 909,
                "X-EBAY-API-DEV-NAME": "b4800ef5-265c-4b24-863e-99bdc92c3ec5",
                //"X-EBAY-API-DEV-NAME": "8907a679-bbd0-4ac0-aa35-7b350e9496a1",
                "X-EBAY-API-APP-NAME": "BhanuJai-Gluec-SBX-c38c4f481-f1f53a35",
                //"X-EBAY-API-APP-NAME": "6ef7bb86-02ad-45b3-9a01-f00e0e8c7d26",
                "X-EBAY-API-CERT-NAME": "SBX-38c4f481ab0e-b034-4a34-8a55-317e",
                //"X-EBAY-API-CERT-NAME": "62d7919c-bfc5-449d-9832-96a29f17ca15",
                "X-EBAY-API-SITEID": 0,
                "X-EBAY-API-CALL-NAME": "GetCategories"
            },
            data: '<?xml version="1.0" encoding="utf-8"?>' +
            '<GetCategoriesRequest xmlns="urn:ebay:apis:eBLBaseComponents">' +
            '<RequesterCredentials>' +
            '<eBayAuthToken>' +
            AUTH_TOKEN +
            '</eBayAuthToken>' +
            '</RequesterCredentials>' +
            '<CategorySiteID>' + 0 + '</CategorySiteID>' +
            '<DetailLevel>ReturnAll</DetailLevel>' +
            '<LevelLimit>' + 1 + '</LevelLimit>' +
            '</GetCategoriesRequest>',
            requestConfig: {
                timeout: 1000, //request timeout in milliseconds
                noDelay: true, //Enable/disable the Nagle algorithm
                keepAlive: true, //Enable/disable keep-alive functionalityidle socket.
                keepAliveDelay: 1000 //and optionally set the initial delay before the first keepalive probe is sent
            },
            responseConfig: {
                timeout: 1000 //response timeout
            },
            mimetypes: {
                xml: ["application/xml", "application/xml;charset=utf-8"]
            }

        };

        console.log("Calling Ebay Service");
        client.post("https://api.sandbox.ebay.com/ws/api.dll", args, function (data, response) {
            if (Buffer.isBuffer(data)) {
                data = data.toString('utf8');
                console.log(data);
                parseString(data, function (err, result) {
                    console.log(result);
                    var incomingCatArray = result.GetCategoriesResponse.CategoryArray[0].Category;

                    deferred.resolve(mapCategories(incomingCatArray));

                });

            }
        }).on('error', function (err) {
            console.log('something went wrong on the request ' + err.request.options);
            deferred.reject(err);
        });

        client.on('error', function (err) {
            console.error('Something went wrong on the client ' + err);
            deferred.reject(err);
        });

        return deferred.promise;
    }


    function mapCategories(incomingCatArray) {
        console.log(incomingCatArray)
        var categories = [];
        for (var catindex in incomingCatArray) {
            var cat = {
                "_id": incomingCatArray[catindex].CategoryID[0],
                "parentId": incomingCatArray[catindex].CategoryParentID[0],
                "level": incomingCatArray[catindex].CategoryLevel[0],
                "name": incomingCatArray[catindex].CategoryName[0]
            }
            categories.push(cat);
        }
        return categories;
    }
};