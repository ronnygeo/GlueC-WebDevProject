/**
 * Created by ronnygeo on 3/24/16.
 */
module.exports = function (app, userModel, userImageUpload) {
    app.get("/api/users", findAllUsersAdmin);
    app.get("/api/user/users", findAllUsers);
    app.get("/api/user/:id", findUserById);
    app.get("/api/user/:id/min", findUserByIdMinimal);
    app.get("/api/user", findUserByCredentials);
    app.post("/api/user", registerUser);
    app.put("/api/user/:id", updateUser);
    app.delete("/api/user/:id", deleteUser);
    app.post('/api/user/upload', uploadImage);
    
    function uploadImage(req, res) {
        userImageUpload(req,res,function(err){
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }
            res.json(req.file.filename);
        });
    }


    function findAllUsersAdmin(req, res) {
        userModel
            .findAllUsers()
            .then(function(data){
                // console.log(data);
            res.json(data);
        },
        function (err) {
            res.status(404).send(err);
        });
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function(data){
                delete data.password;
                    // console.log(data);
                    res.json(data);
                },
                function (err) {
                    res.status(404).send(err);
                });
    }

    function findUserById(req, res) {
        var userId = req.params['id'];
        userModel.findUserById(userId).then(function (data) {
            // console.log(data);
            res.json(data);
        },
            function (err) {
                res.status(404).send(err);
            });
    }

    function findUserByIdMinimal(req, res) {
        var userId = req.params['id'];
        userModel.findUserById(userId).then(function (data) {
                delete data.password;
                res.json(data);
            },
            function (err) {
                res.status(404).send(err);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        // console.log(username, password);
        userModel.findUserByCredentials(username, password).then(function (data) {
                // console.log(data);
                res.json(data);
             }, function (err) {
            console.log("Error", err);
            res.status(400).send(err);
        }
            )
    }

    function registerUser(req, res) {
        // console.log(req);
        var data = req.body;
        // console.log(data);
        userModel.register(data).then(function (data) {
                res.json(data);
            },
            function (err) {
                res.status(404).send(err);
            });
    }

    function updateUser(req, res) {
        var userId = req.params['id'];
        data = req.body;
        userModel.updateUser(userId, data).then(function (data) {
            // console.log(data);
            res.json(data);
            },
            function (err) {
                res.status(404).send(err);
            });
    }
    function deleteUser(req, res) {
        var userId = req.params['id'];
        userModel.deleteUser(userId).then(function (data) {
                res.json(data);
            },
            function (err) {
                res.status(404).send(err);
            });
    }

};