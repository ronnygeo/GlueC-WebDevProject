/**
 * Created by ronnygeo on 3/24/16.
 */
module.exports = function (mongoose) {
    var q = require("q");
    var bcrypt = require('bcrypt-nodejs');
    //var users = require("./user.test.json");

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('User', UserSchema);

    return {
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        register: register,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId
    };


    //returns a single user whose username is equal to username parameter, null otherwise
    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}).then(function (data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId).then(function(data) {
            deferred.resolve(data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    // //Accepts parameters username, password, and callback function
    // //Iterates over the array of current users looking for user object
    // // whose username and password match the parameters
    // //Calls bac k with user found or null otherwise

    //returns a single user whose username is equal to username parameter, null otherwise
    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne({username: credentials.username}).then(function (data) {
            // console.log(data, credentials);
            if (bcrypt.compareSync(credentials.password, data.password)) {
                //  if (credentials.password === data.password) {
                deferred.resolve(data);
            } else {
                deferred.reject(404);
            }
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }


    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find().then(function(data) {
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
    function register(user) {
        var deferred = q.defer();
        user.password = bcrypt.hashSync(user.password);
        UserModel.create(user).then(function(data) {
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
    function updateUser(userId, data) {
        var deferred = q.defer();
        // console.log(data);
        delete data._id;

        UserModel.findById(userId).then(function (oldUser) {
            if (data.password !== oldUser.password || !bcrypt.compareSync(data.password, oldUser.password)) {
                data.password = bcrypt.hashSync(data.password);
                // console.log(data.password);
            }
            UserModel.update({_id: userId}, data)
                .then(function(res){
                    deferred.resolve(res);
                }, function (err) {
                    deferred.reject(err);
                });
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
    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.remove({_id: userId}).then(function(){
            UserModel.find().then(function(data){
                deferred.resolve(data);
            });
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    
    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }

};