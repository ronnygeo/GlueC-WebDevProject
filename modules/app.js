module.exports = function (app, request, q, uuid, upload, mongoose) {

    var userModel = require("./models/user/user.model.js")(uuid);
    require("./services/user/user.service.js")(app, userModel);

    var catalogModel = require('./models/catalog/catalog.model.js')(uuid);
    require("./services/catalog/catalog.service.js")(app, catalogModel);

    var productModel = require("./models/product/product.model.js")(q, uuid, request);
    require("./services/provider/product.service.server.js")(app, productModel);
    require("./services/product/product.service.js")(app, productModel);

    var categoryModel = require("./models/category/category.model.js")(q, uuid, request);
    require("./services/category/category.service.server")(app, categoryModel);

    var MessageModel = require("./models/message/message.model.js")(q, uuid);
    require("./services/message/message.service.js")(app, MessageModel);

    /*EBAY API CLIENT*/
    var ebayAPIClient =  require("./services/ebay/ebay.api.server")();

    var listingSchema = require("./models/listing/listing.schema.server")(mongoose);
    var listingDB = mongoose.model("Listing", listingSchema);
    var listingModel = require("./models/listing/listing.model")(listingDB);
    require("./services/listing/listing.service.server")(app, listingModel, categoryModel, ebayAPIClient,upload);

};