/**
 * Created by ronnygeo on 3/26/16.
 */

module.exports = function (app, productModel, productImageUpload) {

    // app.get('api/user/:id/product/:prodId', findProductByUserId);
    // app.get('api/catalog/:catId/product/:prodId', findProductByCatalogId);
    app.get('/api/product/:prodId', findProductById);
    app.get('/api/products', findAllProducts);
    app.get('/api/user/:id/products', findAllProductsByUserId);
    app.get('/api/catalog/:catId/products', findAllProductsByCatalogId);
    app.post('/api/user/:id/product', createProduct);
    app.put('/api/user/:id/product/:prodId', updateProduct);
    app.delete('/api/user/:id/product/:prodId', deleteProduct);
    app.post('/api/product/upload', uploadImage);

    function uploadImage(req, res) {
        productImageUpload(req,res,function(err){
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }
            res.json(req.file.filename);
        });
    }

    // function findProductByUserId(req, res) {}
    // function findProductByCatalogId(req, res) {}

    function findProductById(req, res) {
        var prodId = req.params['prodId'];
        productModel.product.findProductById(prodId).then(function (data) {
            res.json(data);
        },
        function (err){
            res.status(400).send(err);
        })
    }

    function findAllProductsByUserId(req, res) {
        var userId = req.params['id'];
        productModel.product.findAllProductsByUserId(userId).then(function (data) {
                res.json(data);
            },
            function (err){
                res.status(400).send(err);
            });
    }

    function findAllProductsByCatalogId(req, res) {
        var catId = req.params['catId'];
        productModel.product.findAllProductsByCatalogId(catId).then(function (data) {
                res.json(data);
            },
            function (err){
                res.status(400).send(err);
            });
    }

    function findAllProducts(req, res) {
    productModel.product.findAllProducts().then(function (data) {
            res.json(data);
        },
        function (err){
            res.status(400).send(err);
        });

    }

    function createProduct(req,res) {
    var product = req.body;
        var userId = req.params['id'];
        productModel.product.createProduct(userId, product).then(function (data) {
                res.json(data);
            },
            function (err){
                res.status(400).send(err);
            });

    }

    function updateProduct(req, res) {
        var product = req.body;
        var prodId = req.params['prodId'];
        productModel.product.updateProduct(prodId, product).then(function (data) {
                res.json(data);
            },
            function (err){
                res.status(400).send(err);
            });
    }

    function deleteProduct(req, res) {
        var prodId = req.params['prodId'];
        productModel.product.deleteProduct(prodId).then(function (data) {
                res.json(data);
            },
            function (err){
                res.status(400).send(err);
            });
    }
};