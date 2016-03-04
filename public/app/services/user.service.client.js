/**
 * Created by Bhanu on 02/03/2016.
 */

"use strict";
(function () {
    angular
        .module("GluecApp")
        .factory("UserService", UserService);

    function UserService() {

        var current_users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["basic"], "email": "alice@test.com"
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"], "email": "bob@test.com"
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["pro"], "email": "charlie@test.com"
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["admin"], "email": "craig@test.com"
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["basic"], "email": "edward@test.com"
            }
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        //Accepts parameters username, password, and callback function
        //Iterates over the array of current users looking for user object
        // whose username and password match the parameters
        //Calls bac k with user found or null otherwise
        function findUserByCredentials(username, password, callback) {
            for (let user of current_users) {
                if (user.username === username && user.password === password) {
                    callback(user);
                } else {
                    callback(null);
                }
            }

        };

        //findAllUsers(callback)
        //Accepts parameter callback function
        //Calls back with array of all u
        function findAllUsers(callback) {
            callback(current_users);
        }

        //Accepts parameters user object and callback function
        //Adds property called _id with unique value to the user object parameter.
        //Adds the new user to local array of users
        //Calls back with new user
        function createUser(form_user, callback) {
            if (form_user.password === form_user.repeatPassword) {
                var new_user = {
                    _id: Math.floor(Math.random() * 900) + 100,
                    firstName: form_user.firstName,
                    lastName: form_user.lastName,
                    username: form_user.username,
                    password: form_user.password,
                    role: "",
                    email: form_user.email
                };
                current_users.push(new_user);
                callback(new_user);
            } else {
                callback(null);
            }
        };

        //Accepts parameters user id and callback function
        //Iterates over the array of current users looking for a
        // user object whose user id is equal to parameter user id
        //If found, removes user from the array of current users
        //Calls back with remaining array of all users
        function deleteUserById(userId, callback) {
            for (let user_index in current_users) {
                if (current_users[user_index]._id === userId) {
                    current_users.splice(user_index, 1);
                }
                callback(current_users);
            }
        };


        //Accepts parameters user id, user object and callback function
        //Iterates over the array of current users looking for a user
        // object whose user id is equal to parameter user id
        //If found, updates user with new user properties
        //Calls back with updated user
        function updateUser(userId, newUser, callback) {
            for (let user of current_users) {
                if (user._id === userId) {
                    user.firstName = newUser.firstName;
                    user.lastName = newUser.lastName;
                    user.username = newUser.username;
                    user.password = newUser.password;
                    user.roles = newUser.roles;
                    user.email = newUser.email;
                    callback(user);
                } else {
                    callback(null);
                }
            }
        }


    };
})();