/**
 * Created by Bhanu on 25/03/2016.
 */

module.exports = function (q, request, mongoose) {


    var ProductSchema = require("./product.schema.server.js")(mongoose);
    var ProductModel = mongoose.model('Product', ProductSchema);

    // var products = require('./product.local.test.json');


    var api = {
        product: {
            // findProductByUserId: findProductByUserId,
            // findProductByCatalogId: findProductByCatalogId,
            findProductById: findProductById,
            findAllProductsByUserId: findAllProductsByUserId,
            findAllProductsByCatalogId: findAllProductsByCatalogId,
            findAllProducts: findAllProducts,
            createProduct: createProduct,
            updateProduct: updateProduct,
            deleteProduct: deleteProduct
        }
    };
    return api;

    // function findProductByUserId(req, res) {}
    // function findProductByCatalogId(req, res) {}

    //Functions for our product
    function findProductById(prodId) {
        var deferred = q.defer();
        ProductModel.findById(prodId).then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    function findAllProductsByUserId(userId) {
        var deferred = q.defer();
        ProductModel.find({"merchantId": userId}).then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }


    function findAllProductsByCatalogId(catId) {
        var deferred = q.defer();
        ProductModel.find({"catalogId": catId}).then(function (prod) {
            deferred.resolve(prod);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }


    function findAllProducts() {
        var deferred = q.defer();
        ProductModel.find().then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    // //Accepts parameters user object and callback function
    // //Adds property called _id with unique value to the user object parameter.
    // //Adds the new user to local array of users
    // //Calls back with new user
    function createProduct(userId, prod) {
        var deferred = q.defer();
        prod.merchantId = userId;
        ProductModel.create(prod).then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    // //Accepts parameters user id, user object and callback function
    // //Iterates over the array of current users looking for a user
    // // object whose user id is equal to parameter user id
    // //If found, updates user with new user properties
    // //Calls back with updated user
    function updateProduct(prodId, prod) {
        var deferred = q.defer();
        ProductModel.update({_id: prodId}, prod).then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    // //Accepts parameters user id and callback function
    // //Iterates over the array of current users looking for a
    // // user object whose user id is equal to parameter user id
    // //If found, removes user from the array of current users
    // //Calls back with remaining array of all users
    function deleteProduct(prodId) {
        var deferred = q.defer();
        ProductModel.remove({_id: prodId}).then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    function amazonFindItemsByKeywords(keyword) {
        var amazon_providerId = "10002";
        var deferred = q.defer();
        // console.log(keyword);
        var prodAdv = aws.createProdAdvClient("AKIAJIAF55AX5MUBCQYQ", "6WAxZ3AS8xvoKFjSfjwUJhjgq9jP7kQ5xlb+Ub+G", "glueclabs-20");
        var options = {SearchIndex: "All", Keywords: keyword, ResponseGroup: "Images,ItemAttributes,ItemIds"};
        prodAdv.call("ItemSearch", options, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                var items = result.Items.Item;
                // console.log(I);
                // console.log(I.MediumImage.URL)
                // console.log(I.DetailPageURL)
                // console.log(I.ItemAttributes.Title)
                // console.log(I.ItemAttributes.Feature[0])
                //console.log(items);
                deferred.resolve(mapListingToGluecListing(items, amazon_providerId));
            }
        });
        return deferred.promise;
    }


};