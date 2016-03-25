module.exports = function (app, ProductModel) {

    app.get("/api/getSingleItem/:provider/:itemId", getSingleItem);
    app.get("/api/getItems/:keyword", findItemsAdvanced);

    function getSingleItem(provider, itemId) {

        if (provider == "Ebay") {
            ProductModel.ebay
                .getSingleItem(itemId)
                .then(success_callback, errorCallback);

            function success_callback(response) {
                console.log(response);
                res.json(response.data.Item);
            }

            function error_callback(error) {
                console.log(error);
                res.statusCode(404).send(err);
            }

        }
    }

    function findItemsAdvanced(req, res) {

        /*Step1: Get Providers*/

        /*Get Items from all the providers*/

        /*Getting the items from ebay*/
        ProductModel
            .ebay.findItemsAdvanced(req.params.keyword)
            .then(success_callback, error_callback);

        function success_callback(response) {
            //console.log(response);
            res.send(response);
        }

        function error_callback(error) {
            console.log(error);
            res.statusCode(404).send(error);
        }

    }

};



