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

        // var current_users = [
        //     {
        //         "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
        //         "username": "alice", "password": "alice", "roles": ["basic"], "email": "alice@test.com"
        //     },
        //     {
        //         "_id": 234, "firstName": "Bob", "lastName": "Hope",
        //         "username": "bob", "password": "bob", "roles": ["admin"], "email": "bob@test.com"
        //     },
        //     {
        //         "_id": 345, "firstName": "Charlie", "lastName": "Brown",
        //         "username": "charlie", "password": "charlie", "roles": ["pro"], "email": "charlie@test.com"
        //     },
        //     {
        //         "_id": 456, "firstName": "Dan", "lastName": "Craig",
        //         "username": "dan", "password": "dan", "roles": ["admin"], "email": "craig@test.com"
        //     },
        //     {
        //         "_id": 567, "firstName": "Edward", "lastName": "Norton",
        //         "username": "ed", "password": "ed", "roles": ["basic"], "email": "edward@test.com"
        //     }
        // ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserById() {
            $http.get("/api/user/:id").then(function (data) {
                return data.data;
            });
        }
        //Accepts parameters username, password, and callback function
        //Iterates over the array of current users looking for user object
        // whose username and password match the parameters
        //Calls bac k with user found or null otherwise
        function findUserByCredentials(username, password) {
            console.log(username, password);
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        //findAllUsers(callback)
        //Accepts parameter callback function
        //Calls back with array of all u
        function findAllUsers() {
            $http.get("/api/users").then(function (data) {
                return data.data;
            })
        }

        //Accepts parameters user object and callback function
        //Adds property called _id with unique value to the user object parameter.
        //Adds the new user to local array of users
        //Calls back with new user
        function createUser(user) {
            return $http.post("/api/user", user);
        }

        //Accepts parameters user id and callback function
        //Iterates over the array of current users looking for a
        // user object whose user id is equal to parameter user id
        //If found, removes user from the array of current users
        //Calls back with remaining array of all users
        function deleteUserById(userId) {
            return $http.delete("/api/user/:userId");
        }

        //Accepts parameters user id, user object and callback function
        //Iterates over the array of current users looking for a user
        // object whose user id is equal to parameter user id
        //If found, updates user with new user properties
        //Calls back with updated user
        function updateUser(userId, newUser) {
            return $http.put("/api/user/:userId", newUser);
        }
    }
})();