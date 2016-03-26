/**
 * Created by Bhanu on 26/03/2016.
 */

module.exports = function (app, CategoryModel) {

    app.get("/api/getTopLevelCategories/:providerId", getTopLevelCategories);
    app.get("/api/getSubCategories/:providerId/:parentCategoryId", getSubCategories);

    function getSubCategories(req, res) {
        if (req.params.providerId == "10001") {
            CategoryModel.ebay
                .getSubCategories(req.params.parentCategoryId)
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
            CategoryModel.ebay
                .getTopLevelCategories()
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

};