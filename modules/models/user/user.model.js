/**
 * Created by ronnygeo on 3/24/16.
 */
 module.exports = function (uuid) {
     var q = require("q");
     var users = require("./user.test.json");

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
         var found = 0;
         for(var u in users) {
             // console.log(u);
             if( users[u]._id == userId ) {
                 // console.log(users[u]);
                 found = 1;
                 deferred.resolve(users[u]);
                 break;
             }
         }
         console.log(found);
         if (found == 0) {
             deferred.reject();
            found = 0;
         }
         return deferred.promise;
     }

     // //Accepts parameters username, password, and callback function
     // //Iterates over the array of current users looking for user object
     // // whose username and password match the parameters
     // //Calls bac k with user found or null otherwise
     function findUserByCredentials(username, password) {
         var found = 0;
         var deferred = q.defer();
         for (var i in users) {
             var user = users[i];
             if (user.username === username && user.password === password) {
                 console.log(username, password);
                 console.log(user);
                 found = 1;
                 deferred.resolve(user);
                 break;
             }
         }
         if (found == 0)
         deferred.reject();
        return deferred.promise;
     }

     function findAllUsers() {
         var deferred = q.defer();

         deferred.resolve(users);
         return deferred.promise;
     }

     // //Accepts parameters user object and callback function
     // //Adds property called _id with unique value to the user object parameter.
     // //Adds the new user to local array of users
     // //Calls back with new user
     function register(user) {
         var deferred = q.defer();
         user._id = uuid.v1();
         if (users.push(user)) {
             deferred.resolve(user);
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
     function updateUser(userId, data) {
         var deferred = q.defer();
         var user = findById(userId);
         var found = 0;
         if (user) {
             for (var key in data) {
                 user[key] = data[key];
             }
             found = 1;
             deferred.resolve(user);
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
     function deleteUser(userId) {
         var deferred = q.defer();
         for (var i = 0; i < users.length; i++){
             if (userId == users[i]._id)
             {
                 users.splice(i, 1);
                 break;
             }
         }
         deferred.resolve(users);
         return deferred.promise;
     }
 };