module.exports = function (app, request, q, uuid) {
    var userModel = require("./models/user/user.model.js")(q, uuid);
    require("./services/user/user.service.js")(app, userModel);
    //require("./modules/services/provider/ebay.service.js")(app, request);
}