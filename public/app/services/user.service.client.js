/**
 * Created by Bhanu on 02/03/2016.
 */

"use strict";
(function () {
    angular
        .module("GluecApp")
        .factory("UserService", UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {


        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByIdMinimal: findUserByIdMinimal,
            findAllUsersAdmin: findAllUsersAdmin,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByIdMinimal(userId) {
            return $http.get("/api/user/"+userId+"/min");
        }

        //Accepts parameters username, password, and callback function
        //Iterates over the array of current users looking for user object
        // whose username and password match the parameters
        //Calls bac k with user found or null otherwise
        function findUserByCredentials(username, password) {
            // console.log(username, password);
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        //findAllUsers(callback)
        //Accepts parameter callback function
        //Calls back with array of all u
        function findAllUsersAdmin() {
            return $http.get("/api/users");
        }

        //findAllUsers(callback)
        //Accepts parameter callback function
        //Calls back with array of all u
        function findAllUsers() {
            return $http.get("/api/user/users");
        }

        //Accepts parameters user object and callback function
        //Adds property called _id with unique value to the user object parameter.
        //Adds the new user to local array of users
        //Calls back with new user
        function createUser(user) {
            // console.log(user);
            return $http.post("/api/user", user);
        }

        //Accepts parameters user id and callback function
        //Iterates over the array of current users looking for a
        // user object whose user id is equal to parameter user id
        //If found, removes user from the array of current users
        //Calls back with remaining array of all users
        function deleteUserById(userId) {
            return $http.delete("/api/user/"+userId);
        }

        //Accepts parameters user id, user object and callback function
        //Iterates over the array of current users looking for a user
        // object whose user id is equal to parameter user id
        //If found, updates user with new user properties
        //Calls back with updated user
        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }
    }
})();