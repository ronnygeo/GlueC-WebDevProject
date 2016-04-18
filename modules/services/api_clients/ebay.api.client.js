/**
 * Created by Bhanu on 09/04/2016.
 */
var Client = require('node-rest-client').Client;
var parseString = require('xml2js').parseString;
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
        "rwuQPB/7qQpdr4Hn61ByLnr9bXpAPChqNmAlD"
    ,
    APP_ID = "BhanuJai-Gluec-PRD-d38ccaf50-a1104f30",
    FIND_API = "http://svcs.ebay.com/services/search/FindingService/v1",
    SHOPPING_API = "http://open.api.ebay.com/shopping";

module.exports = function (q, request) {
    var api = {
        trading: {
            function: trading,
            AUTH_TOKEN: AUTH_TOKEN,
            uploadImage: uploadImage,
            SANDBOX_URL: "http://cgi.sandbox.ebay.com/"
        },
        finding: {
            function: finding
        },
        shopping: {
            function: shopping
        }
    };
    return api;

    function shopping(functionToCall, urlRequestData) {
        var deferred = q.defer();
        var url = SHOPPING_API;
        url += "?callName=" + functionToCall;
        url += "&responseencoding=JSON";
        url += "&appid=" + APP_ID;
        url += "&siteid=0";
        url += "&version=515";
        url += urlRequestData;

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var res = JSON.parse(body);
                console.log(res);
                deferred.resolve(res);
            } else {
                console.log(error);
                deferred.reject(error);
            }
        });
        return deferred.promise;
    }

    function finding(functionToCall, urlRequestData) {
        console.log("Calling Ebay Client finding API with function ", functionToCall);
        var deferred = q.defer();
        var url = FIND_API;
        url += "?OPERATION-NAME=" + functionToCall;
        url += "&SERVICE-VERSION=1.0.0";
        url += "&SECURITY-APPNAME=" + APP_ID;
        url += "&GLOBAL-ID=EBAY-US";
        url += "&RESPONSE-DATA-FORMAT=JSON";
        url += "&REST-PAYLOAD";
        url += urlRequestData;

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var res = JSON.parse(body);
                console.log(res);
                deferred.resolve(res);
            } else {
                console.log(error);
                deferred.reject(error);
            }
        });
        return deferred.promise;
    }


    function trading(functionToCall, requestData) {
        console.log("Calling Ebay Trading API for [" + functionToCall + "]");
        console.log("Request Data :: [[" + requestData + "]]");
        var deferred = q.defer();
        var client = new Client();
        var args = {
            headers: {
                "X-EBAY-API-COMPATIBILITY-LEVEL": 909,
                "X-EBAY-API-DEV-NAME": "b4800ef5-265c-4b24-863e-99bdc92c3ec5",
                "X-EBAY-API-APP-NAME": "BhanuJai-Gluec-SBX-c38c4f481-f1f53a35",
                "X-EBAY-API-CERT-NAME": "SBX-38c4f481ab0e-b034-4a34-8a55-317e",
                "X-EBAY-API-SITEID": 0,
                "X-EBAY-API-CALL-NAME": functionToCall
            },
            data: requestData,
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
        client.post("https://api.sandbox.ebay.com/ws/api.dll", args, function (data, response) {
            if (Buffer.isBuffer(data)) {
                data = data.toString('utf8');
                console.log(data);
                parseString(data, {attrkey: '@'}, function (err, result) {
                    console.log(result);
                    deferred.resolve(result);
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


    function uploadImage(imageFile, xml_payload) {
        console.log("Calling Ebay Trading API for [ UploadSiteHostedPictures ]");
        var deferred = q.defer();
        var client = new Client();
        var args = {
            headers: {
                "X-EBAY-API-COMPATIBILITY-LEVEL": 909,
                "X-EBAY-API-DEV-NAME": "b4800ef5-265c-4b24-863e-99bdc92c3ec5",
                "X-EBAY-API-APP-NAME": "BhanuJai-Gluec-SBX-c38c4f481-f1f53a35",
                "X-EBAY-API-CERT-NAME": "SBX-38c4f481ab0e-b034-4a34-8a55-317e",
                "X-EBAY-API-SITEID": 0,
                "X-EBAY-API-CALL-NAME": 'UploadSiteHostedPictures'
            },
            data: {"xml_payload": xml_payload, "file_payload": imageFile},
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
        client.post("https://api.sandbox.ebay.com/ws/api.dll", args, function (data, response) {
            if (Buffer.isBuffer(data)) {
                data = data.toString('utf8');
                console.log(data);
                parseString(data, function (err, result) {
                    console.log(result);
                    deferred.resolve(result);
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

};