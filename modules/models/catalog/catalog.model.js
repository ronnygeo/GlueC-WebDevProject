/**
 * Created by ronnygeo on 3/25/16.
 */
module.exports = function (q, mongoose) {
    // var catalogs = require("./catalog.test.json");
    var CatalogSchema = require("./catalog.schema.server.js")(mongoose);
    var CatalogModel = mongoose.model('Catalog', CatalogSchema);

    return {
        findAllCatalogs: findAllCatalogs,
        findAllCatalogsByUser: findAllCatalogsByUser,
        findCatalogById: findCatalogById,
        createCatalog: createCatalog,
        updateCatalog: updateCatalog,
        deleteCatalog: deleteCatalog
    };

    function findCatalogById(catId) {
        var deferred = q.defer();
        CatalogModel.findById(catId)
            .then(function(data){
                deferred.resolve(data);
            }, function(err){
                deferred.reject(err);
            });
        return deferred.promise;
    }

    // //Accepts parameters username, password, and callback function
    // //Iterates over the array of current users looking for user object
    // // whose username and password match the parameters
    // //Calls bac k with user found or null otherwise
    function findAllCatalogsByUser(userId) {
        var deferred = q.defer();
        CatalogModel.find({"merchantId": userId})
            .then(function (data) {
                deferred.resolve(data);
            }, function (err){
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function findAllCatalogs() {
        var deferred = q.defer();
        CatalogModel.find().then(function (data) {
            deferred.resolve(data);
        }, function (err){
            deferred.reject(err);
        });
        return deferred.promise;
    }

    // //Accepts parameters user object and callback function
    // //Adds property called _id with unique value to the user object parameter.
    // //Adds the new user to local array of users
    // //Calls back with new user
    function createCatalog(userId, cat) {
        var deferred = q.defer();
        cat.merchantId = userId;
        CatalogModel.create(cat).then(function (data) {
            deferred.resolve(data);
        }, function (err){
            deferred.reject(err);
        });
        return deferred.promise;
    }

    // //Accepts parameters user id, user object and callback function
    // //Iterates over the array of current users looking for a user
    // // object whose user id is equal to parameter user id
    // //If found, updates user with new user properties
    // //Calls back with updated user
    function updateCatalog(catId, cat) {
        var deferred = q.defer();
        CatalogModel.update({ _id: catId}, cat).then(function (data) {
            deferred.resolve(data);
        }, function (err){
            deferred.reject(err);
        });
        return deferred.promise;
    }

    // //Accepts parameters user id and callback function
    // //Iterates over the array of current users looking for a
    // // user object whose user id is equal to parameter user id
    // //If found, removes user from the array of current users
    // //Calls back with remaining array of all users
    function deleteCatalog(catId) {
        var deferred = q.defer();
        CatalogModel.remove({_id: catId}).then(function (data) {
            deferred.resolve(data);
        }, function (err){
            deferred.reject(err);
        });
        return deferred.promise;
    }
};