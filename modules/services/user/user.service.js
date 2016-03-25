/**
 * Created by ronnygeo on 3/24/16.
 */
module.exports = function (app, userModel) {
    "use strict";
    app.get("/api/user", findAllUsers);
    app.get("/api/user/:id", findUserById);
    app.get("/api/user/", findUserByCredentials);
    app.post("/api/user", registerUser);
    app.put("/api/user/:id", updateUser);

    function findAllUsers() {
        userModel
            .findAllUsers()
            .then(function(data){
            res.json(data);
        },
        function (err) {
            res.statusCode(404).send(err);
        });
    }
    function findUserById(userId) {
        userModel.findUserById(userId).then(function (data) {
            res.json(data);
        },
            function (err) {
                res.statusCode(404).send(err);
            });
    }

    function findUserByCredentials(credentials) {
        userModel.findUserByCredentials(credentials).then(function (data) {
                res.json(data);
            },
            function (err) {
                res.statusCode(404).send(err);
            });
    }

    function registerUser(data) {
        userModel.register(data).then(function (data) {
                res.json(data);
            },
            function (err) {
                res.statusCode(404).send(err);
            });
    }

    function updateUser(userId, data) {
        userModel.updateUser(userId, data).then(function (data) {
                res.json(data);
            },
            function (err) {
                res.statusCode(404).send(err);
            });
    }
};