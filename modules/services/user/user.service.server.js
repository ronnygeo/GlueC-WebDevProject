/**
 * Created by ronnygeo on 3/24/16.
 */
module.exports = function (app, userModel, userImageUpload, passport) {

    var googleConfig = {
        clientID        : process.env.GOOGLE_CLIENT_ID,
        clientSecret    : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL     : process.env.GOOGLE_CALLBACK_URL
    };

    var facebookConfig = {
        clientID        : process.env.FACEBOOK_CLIENT_ID,
        clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL     : process.env.FACEBOOK_CALLBACK_URL
    };
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get("/api/users", findAllUsersAdmin);
    app.get("/api/user/users", findAllUsers);
    app.get("/api/user/:id", passport.authenticate('local'), findUserById);
    app.get("/api/user/:id/min", findUserByIdMinimal);
    app.get("/api/user", findUserByCredentials);
    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/user", registerUser);
    app.put("/api/user/:id", updateUser);
    app.delete("/api/user/:id", deleteUser);
    app.post('/api/user/upload', uploadImage);
    app.post('/api/logout', logout);
    app.get('/api/loggedIn', loggedIn);
    app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#',
            failureRedirect: '/#/login'
        }));

    app.get   ('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get   ('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '#',
            failureRedirect: '#/login'
        }));

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newGoogleUser = {
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            email: profile.emails[0].value,
                            google: {
                                id:          profile.id,
                                token:       token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function uploadImage(req, res) {
        userImageUpload(req,res,function(err){
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }
            res.json(req.file.filename);
        });
    }


    function findAllUsers(req, res) {
        // console.log("find all users.");
        userModel
            .findAllUsers()
            .then(function(data){
                for (u in data) {
                    delete data[u].password;
                }
                // console.log(data);
            res.json(data);
        },
        function (err) {
            res.status(404).send(err);
        });
    }

    function findAllUsersAdmin(req, res) {
        if (isAdmin(req.user)) {
            userModel.findAllUsers()
                .then(function(data){
                        delete data.password;
                        // console.log(data);
                        res.json(data);
                    },
                    function (err) {
                        res.status(404).send(err);
                    });
        } else {
            res.status(403).send(403);
        }
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
        var user = {};
        user.username = req.query.username;
        user.password = req.query.password;
        // console.log(username, password);
        userModel.findUserByCredentials(user).then(function (data) {
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
        userModel
            .findUserByUsername(data.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.register(data);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function localStrategy(username, password, done) {
        // console.log(username, password);
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") !== -1) {
            return true;
        }
        return false;
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
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