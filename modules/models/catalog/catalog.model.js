/**
 * Created by ronnygeo on 3/25/16.
 */

module.exports = function (uuid) {
    var q = require("q");
    var catalogs = require("./catalog.test.json");
    
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
        var found = 0;
        for(var c in catalogs) {
            // console.log(u);
            if( catalogs[c]._id == catId ) {
                found = 1;
                deferred.resolve(catalogs[c]);
                break;
            }
        }
        console.log(found);
        if (found === 0) {
            deferred.reject();
        }
        return deferred.promise;
    }

    // //Accepts parameters username, password, and callback function
    // //Iterates over the array of current users looking for user object
    // // whose username and password match the parameters
    // //Calls bac k with user found or null otherwise
    function findAllCatalogsByUser(userId) {
        var collection = [];
        var deferred = q.defer();
        for (var i in catalogs) {
            var catalog = catalogs[i];
            if (catalog.merchantId == userId) {
                collection.push(catalog);
             }
        }
        deferred.resolve(collection);
        //deferred.reject();
        return deferred.promise;
    }

    function findAllCatalogs() {
        var deferred = q.defer();
        deferred.resolve(catalogs);
        return deferred.promise;
    }

    // //Accepts parameters user object and callback function
    // //Adds property called _id with unique value to the user object parameter.
    // //Adds the new user to local array of users
    // //Calls back with new user
    function createCatalog(userId, data) {
        var deferred = q.defer();
        data._id = uuid.v1();
        data.merchantId = userId;
        if (catalogs.push(data)) {
            deferred.resolve(catalogs);
        } else {
            deferred.reject();
        }
        return deferred.promise;
    }

    // //Accepts parameters user id, user object and callback function
    // //Iterates over the array of current users looking for a user
    // // object whose user id is equal to parameter user id
    // //If found, updates user with new user properties
    // //Calls back with updated user
    function updateCatalog(catId, data) {
        var deferred = q.defer();
        var catalog = findCatalogById(catId);
        var found = 0;
        if (catalog) {
            for (var key in data) {
                catalog[key] = data[key];
            }
            found = 1;
            deferred.resolve(catalog);
        }
        if (found === 0)
            deferred.reject();
        return deferred.promise;
    }

    // //Accepts parameters user id and callback function
    // //Iterates over the array of current users looking for a
    // // user object whose user id is equal to parameter user id
    // //If found, removes user from the array of current users
    // //Calls back with remaining array of all users
    function deleteCatalog(catId) {
        var deferred = q.defer();
        for (var i = 0; i < catalogs.length; i++){
            if (catId == catalogs[i]._id)
            {
                catalogs.splice(i, 1);
                break;
            }
        }
        deferred.resolve(catalogs);
        return deferred.promise;
    }
};