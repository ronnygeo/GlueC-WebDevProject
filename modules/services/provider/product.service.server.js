module.exports = function (app, request, ProductModel) {

    app.get("/api/getSingleItem/:provider/:itemId", getSingleItem);
    //app.get("")

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

    function findItemsByKeywords(keyword) {
    }

    function findItemsAdvanced(keyword) {
    }

    function findItemsByProduct(productId, callback) {
    }

    function getEbayItem(req, res) {
    }
};
