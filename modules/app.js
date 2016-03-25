module.exports = function (app, request, uuid) {
    var userModel = require("./models/user/user.model.js")(uuid);
    require("./services/user/user.service.js")(app, userModel);

    var catalogModel = require('./models/catalog/catalog.model.js')(uuid);
    require("./services/catalog/catalog.service.js")(app, catalogModel);

    var productModel = require("./models/product/product.model.js")
    require("./services/provider/product.service.server.js")(app, request,productModel);
}