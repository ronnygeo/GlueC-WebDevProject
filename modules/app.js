module.exports = function (app, request, q, uuid) {
    var userModel = require("./models/user/user.model.js")(q, uuid);
    require("./services/user/user.service.js")(app, userModel);

    var productModel = require("./models/product/product.model.js")
    require("./services/provider/product.service.server.js")(app, request,productModel);
}