/**
 * Created by ronnygeo on 3/25/16.
 */
/**
 * Created by ronnygeo on 3/24/16.
 */
module.exports = function (app, catalogModel, categoryService) {
    app.get("/api/catalogs", findAllCatalogs);
    app.get("/api/user/:id/catalogs", findAllCatalogsByUser);
    app.get("/api/user/:id/catalog/:catId", findCatalogById);
    app.get("/api/user/:id/catalog/:catId/subcategories", getSubCategoriesForCatalog);
    app.post("/api/user/:id/catalog", createCatalog);
    app.put("/api/user/:id/catalog/:catId", updateCatalog);
    app.delete("/api/user/:id/catalog/:catId", deleteCatalog);


    function getSubCategoriesForCatalog(req, res) {
        var catId = req.params['catId'];
        catalogModel.findCatalogById(catId)
            .then(function (data) {
                console.log(data);
                var parentCategoryCode = data.parentCategory.code;
                console.log(parentCategoryCode);
                categoryService.ebay.fetchSubCategories(parentCategoryCode)
                    .then(
                        function (response) {
                            console.log(response);
                            console.log("Filtering Leaf Categories");
                            var catData = categoryService.ebay.filterLeafCategories(response);
                            catData = categoryService.processToGluecFormat(catData);
                            console.log(catData);
                            res.json(catData);
                        },
                        function (error) {
                            console.log(error);
                            res.statusCode(404).send(err);
                        });
            }, function (err) {
                res.statusCode(404).send(err);
                console.log(err)
            })
    }

    function findAllCatalogs(req, res) {
        catalogModel
            .findAllCatalogs()
            .then(function (data) {
                    res.json(data);
                },
                function (err) {
                    res.status(404).send(err);
                });
    }

    function findAllCatalogsByUser(req, res) {
        var userId = req.params['id'];
        var catId = req.params['catId'];
        catalogModel.findAllCatalogsByUser(userId).then(function (data) {
                // console.log(data);
                res.json(data);
            },
            function (err) {
                res.status(404).send(err);
            });
    }

    function deleteCatalog(req, res) {
        var userId = req.params['id'];
        var catId = req.params['catId'];
        catalogModel.deleteCatalog(catId).then(function (data) {
                // console.log(data);
                res.json(data);
            },
            function (err) {
                res.status(404).send(err);
            });
    }

    function findCatalogById(req, res) {
        var userId = req.params['id'];
        var catId = req.params['catId'];
        // console.log(catId);
        catalogModel.findCatalogById(catId).then(function (data) {
                // console.log(data);
                res.json(data);
            },
            function (err) {
                res.status(404).send(err);
            });
    }


    function createCatalog(req, res) {
        var userId = req.params["id"];
        var data = req.body;
        // console.log(userId)
        // console.log(data);
        catalogModel.createCatalog(userId, data).then(function (data) {
                console.log(data);
                res.json(data);
            },
            function (err) {
                res.status(404).send(err);
            });
    }

    function updateCatalog(req, res) {
        var userId = req.params['id'];
        var catId = req.params['catId'];
        data = req.body;
        catalogModel.updateCatalog(catId, data).then(function (data) {
                res.json(data);
            },
            function (err) {
                res.status(404).send(err);
            });
    }
};