module.exports = function (app, ProductModel) {

    app.get("/api/getSingleItem/:providerId/:itemId", getSingleItem);
    app.get("/api/getItems/:keyword", findItemsAdvanced);

    function getSingleItem(req, res) {

        /*Getting Single Item from Ebay*/
        if (req.params.providerId == "10001") {
            ProductModel.ebay
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

        /*Step1: Get Providers*/

        /*Get Items from all the providers*/

        /*Getting the items from ebay*/
        ProductModel
            .ebay.findItemsAdvanced(req.params.keyword)
            .then(success_callback, error_callback);

        function success_callback(response) {
            //console.log(response);
            ProductModel.amazon.findItemsByKeywords(req.params.keyword).then(function (data) {
                // console.log(data);
                response.push(data);
                response.sort();
                res.send(response);
            })
        }

        function error_callback(error) {
            console.log(error);
            res.statusCode(404).send(error);
        }

    }

};



