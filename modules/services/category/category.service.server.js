/**
 * Created by Bhanu on 26/03/2016.
 */

module.exports = function (app, categoryModel) {

    app.get("/api/getTopLevelCategories/:providerId", getTopLevelCategories);
    app.get("/api/getSubCategories/:providerId/:parentCategoryId", getSubCategories);
    app.get("/api/getDetailsForCategory/:providerId/:subCategoryId", getFeaturesForCategory);


    function getFeaturesForCategory(req, res){
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
            categoryModel.ebay
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
            categoryModel.ebay
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