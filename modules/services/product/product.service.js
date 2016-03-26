/**
 * Created by ronnygeo on 3/26/16.
 */

module.exports = function (app) {

    // app.get('api/user/:id/product/:prodId', findProductByUserId);
    // app.get('api/catalog/:catId/product/:prodId', findProductByCatalogId);
    app.get('api/product/:prodId', findProductById);
    app.get('api/product/:prodId', findAllProducts);
    app.get('api/user/:id/products', findAllProductsByUserId);
    app.get('api/catalog/:catId/products', findAllProductsByCatalogId);
    app.post('/api/user/:id/product', createProduct);
    app.put('/api/user/:id/product/:prodId', updateProduct);
    app.delete('/api/user/:id/product/:prodId', deleteProduct);

    // function findProductByUserId(req, res) {}
    // function findProductByCatalogId(req, res) {}

    function findProductById(req, res) {}
    function findAllProductsByUserId(req, res) {}
    function findAllProductsByCatalogId(req, res) {}
    function findAllProducts(req, res) {}

    function createProduct(req,res) {}
    function updateProduct(req, res) {}
    function deleteProduct(req, res) {}
};