/**
 * Created by ronnygeo on 3/24/16.
 */
 module.exports = function (mongoose) {
     var q = require("q");
     //var users = require("./user.test.json");

     // load user schema
     var UserSchema = require("./user.schema.server.js")(mongoose);
     var UserModel = mongoose.model('User', UserSchema);

     return {
         findUserById: findUserById,
         findUserByCredentials: findUserByCredentials,
         findAllUsers: findAllUsers,
         register: register,
         updateUser: updateUser,
         deleteUser: deleteUser
     };

     function findUserById(userId) {
         var deferred = q.defer();
         UserModel.findById(userId, function(err, data) {
             if (err) {
                 deferred.reject(err);
             } else {
                 deferred.resolve(data);
             }
         });
         return deferred.promise;
     }

     // //Accepts parameters username, password, and callback function
     // //Iterates over the array of current users looking for user object
     // // whose username and password match the parameters
     // //Calls bac k with user found or null otherwise
     function findUserByCredentials(username, password) {
         var deferred = q.defer();
         // console.log(username, password);
         UserModel.findOne({username: username, password: password}).then(function(data){
             deferred.resolve(data);
         }, function (err) {
                 deferred.reject(err);
         });
        return deferred.promise;
     }

     function findAllUsers() {
         var deferred = q.defer();
         UserModel.find().then(function(data){
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
         UserModel.create(user).then(function(data){
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
         UserModel.update({ _id: userId}, data).then(function(data){
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
     function deleteUser(userId) {
         var deferred = q.defer();
         UserModel.remove({_id: userId}).then(function(data){
             deferred.resolve(data);
         }, function (err) {
             deferred.reject(err);
         });
         return deferred.promise;
     }
 };