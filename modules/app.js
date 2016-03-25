module.exports = function (app, request, uuid) {
    var userModel = require("./models/user/user.model.js")(uuid);
    require("./services/user/user.service.js")(app, userModel);

    var catalogModel = require('./models/catalog/catalog.model.js')(uuid);
    require("./services/catalog/catalog.service.js")(app, catalogModel);
}