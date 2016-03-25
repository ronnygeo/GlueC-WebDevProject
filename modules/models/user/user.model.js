/**
 * Created by ronnygeo on 3/24/16.
 */
 module.exports = function (q) {
     var defered = q.defer();
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
         "use strict";
         for(var u in users) {
             if( users[u]._id === userId ) {
                 q.resolve(users[u]);
             }
         }
         q.reject();
     }

     // //Accepts parameters username, password, and callback function
     // //Iterates over the array of current users looking for user object
     // // whose username and password match the parameters
     // //Calls bac k with user found or null otherwise
     function findUserByCredentials(credentials) {
         "use strict";
         for (var i in users) {
             var user = users[i];
             if (user.username === credentials.username && user.password === credentials.password) {
                 defered.resolve(user);
             }
         }
         defered.reject();
     }

     function findAllUsers() {
         "use strict";
         defered.resolve(users);
     }

     // //Accepts parameters user object and callback function
     // //Adds property called _id with unique value to the user object parameter.
     // //Adds the new user to local array of users
     // //Calls back with new user
     function register(user) {
         "use strict";
         user._id = uuid.v1();
         if (users.push(user)) {
             defered.resolve(user);
         } else {
             defered.reject();
         }
     }

     // //Accepts parameters user id, user object and callback function
     // //Iterates over the array of current users looking for a user
     // // object whose user id is equal to parameter user id
     // //If found, updates user with new user properties
     // //Calls back with updated user
     function updateUser(userId, data) {
         "use strict";
         var user = findById(userId);
         if (user) {
             for (var key in data) {
                 user[key] = data[key];
             }
             defered.resolve(user);
         }
         defered.reject();
     }

     // //Accepts parameters user id and callback function
     // //Iterates over the array of current users looking for a
     // // user object whose user id is equal to parameter user id
     // //If found, removes user from the array of current users
     // //Calls back with remaining array of all users
     function deleteUser(userId) {
         "use strict";
         for (var i = 0; i < users.length; i++){
             if (userId === users[i]._id)
             {
                 users.splice(i, 1);
                 break;
             }
         }
         defered.resolve(users);
     }

 };