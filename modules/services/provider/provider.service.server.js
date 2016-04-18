/**
 * Created by Bhanu on 15/04/2016.
 */
module.exports = function (app, productModel, providerModel) {

    app.get("/api/providers/:userId", getProvidersForUser);
    app.post("/api/providers", addProviderForUser);

    function getProvidersForUser(req, res) {
        console.log("Server getProvidersForUser");
        var userId = req.params.userId;
        console.log(userId);
        providerModel.getProvidersForUser(userId)
            .then(function (response) {
                console.log(response);
                res.json(response);
            }, function (err) {
                console.log(err);
                res.statusCode(404).send(err);
            })
    }

    function addProviderForUser(req, res) {
        console.log("Server addProviderForUser");
        var provider = req.body;
        console.log(provider);
        providerModel.addProviderForUser(provider)
            .then(function (response) {
                console.log(response);
                res.json(response);
            }, function (err) {
                console.log(err);
                res.statusCode(404).send(err);
            })
    }


};



