module.exports = function (app, request, q, upload, mongoose, uuid) {

    /*EBAY API CLIENT*/
    var ebayAPIClient = require("./services/api_clients/ebay.api.client")(q);
    /*Amazon API CLIENT*/
    var amazonAPIClient = require("./services/api_clients/amazon.api.client")(q);

    var userModel = require("./models/user/user.model.js")(mongoose);
    require("./services/user/user.service.server")(app, userModel);

    var catalogModel = require('./models/catalog/catalog.model.js')(q, mongoose);
    require("./services/catalog/catalog.service.js")(app, catalogModel);

    var productModel = require("./models/product/product.model.js")(q, request, mongoose);
    require("./services/provider/product.service.server.js")(app, productModel);
    require("./services/product/product.service.js")(app, productModel);

    var categoryModel = require("./models/category/category.model.js")(q, request, mongoose);
    var categoryService = require("./services/category/category.service.server")(app, categoryModel, q, ebayAPIClient);

    var MessageModel = require("./models/message/message.model.js")(q, mongoose);
    require("./services/message/message.service.js")(app, MessageModel);

    var listingSchema = require("./models/listing/listing.schema.server")(mongoose);
    var ebayListingSchema = require("./models/listing/ebay.listing.schema.server")(mongoose);
    var ebayListingDB = mongoose.model("EbayListing", ebayListingSchema);
    var listingDB = mongoose.model("Listing", listingSchema);
    var listingModel = require("./models/listing/listing.model")(listingDB, ebayListingDB, q);
    require("./services/listing/listing.service.server")(app, q, listingModel, categoryModel, ebayAPIClient, upload, amazonAPIClient, uuid, categoryService);


    //require("./services/image/clarfai.image.service")();
};