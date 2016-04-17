/**
 * Created by Bhanu on 15/04/2016.
 */
module.exports = function (app, productModel, providerModel) {

    app.get("/api/getSingleItem/:providerId/:itemId", getSingleItem);
    app.get("/api/getItems/:keyword", findItemsAdvanced);
    app.get("/api/providers/:userId", getProvidersForUser);
    app.post("/api/providers", addProviderForUser);

    function getProvidersForUser(req, res) {
        console.log("Server getProvidersForUser");
        var userId = req.params.userId;
        console.log(userId);
        providerModel.getProvidersForUser(userId)
            .then(function (response) {
                console.log(response);
                res.json(response);
            }, function (err) {
                console.log(err);
                res.statusCode(404).send(err);
            })
    }

    function addProviderForUser(req, res) {
        console.log("Server addProviderForUser");
        var provider = req.body;
        console.log(provider);
        providerModel.addProviderForUser(provider)
            .then(function (response) {
                console.log(response);
                res.json(response);
            }, function (err) {
                console.log(err);
                res.statusCode(404).send(err);
            })
    }

    function getSingleItem(req, res) {
        console.log("getSingleItem");
        /*Getting Single Item from Ebay*/
        if (req.params.providerId == "10001") {
            productModel.ebay
                .getSingleItem(req.params.itemId)
                .then(success_callback, error_callback);

            function success_callback(response) {
                // console.log(response);
                res.json(response);
            }

            function error_callback(error) {
                console.log(error);
                res.statusCode(404).send(err);
            }

        }
    }

    function findItemsAdvanced(req, res) {
        var items= [];
        /*Step1: Get Providers*/

        /*Get Items from all the providers*/

        /*Getting the items from ebay*/
        productModel
            .ebay.findItemsAdvanced(req.params.keyword)
            .then(success_callback, error_callback);

        function success_callback(response) {
            //console.log(response);
            productModel.amazon.findItemsByKeywords(req.params.keyword)
                .then(function (data) {
                    //console.log(data);
                    items = response.concat(data);
                    //response.sort();
                    console.log(items );
                    res.json(items );
                }, function (error) {
                    console.log(error);
                    res.statusCode(404).send(error);
                })
        }

        function error_callback(error) {
            console.log(error);
            res.statusCode(404).send(error);
        }

    }

};



