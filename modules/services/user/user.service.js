/**
 * Created by ronnygeo on 3/24/16.
 */
module.exports = function (app, userModel) {
    "use strict";
    app.get("/api/users", findAllUsers);
    app.get("/api/user/:id", findUserById);
    app.get("/api/user", findUserByCredentials);
    app.post("/api/user", registerUser);
    app.put("/api/user/:id", updateUser);

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function(data){
            res.json(data);
        },
        function (err) {
            res.statusCode(404).send(err);
        });
    }
    function findUserById(req, res) {
        var userId = req.params['userId'];
        userModel.findUserById(userId).then(function (data) {
            res.json(data);
        },
            function (err) {
                res.statusCode(404).send(err);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        userModel.findUserByCredentials(username, password).then(function (data) {
                res.json(data);
            },
            function (err) {
                res.statusCode(404).send(err);
            });
    }

    function registerUser(req, res) {
        data = req.body;
        userModel.register(data).then(function (data) {
                res.json(data);
            },
            function (err) {
                res.statusCode(404).send(err);
            });
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        data = req.body;
        userModel.updateUser(userId, data).then(function (data) {
                res.json(data);
            },
            function (err) {
                res.statusCode(404).send(err);
            });
    }
};