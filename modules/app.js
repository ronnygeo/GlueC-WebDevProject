module.exports = function (app, request, q, upload, mongoose, uuid, userImageUpload, productImageUpload, passport) {

    /*EBAY API CLIENT*/
    var ebayAPIClient = require("./services/api_clients/ebay.api.client")(q, request);
    /*Amazon API CLIENT*/
    var amazonAPIClient = require("./services/api_clients/amazon.api.client")(q);

    var userModel = require("./models/user/user.model.js")(mongoose);
    require("./services/user/user.service.server")(app, userModel, userImageUpload, passport);


    var productModel = require("./models/product/product.model.js")(q, request, mongoose);
    require("./services/product/product.service.server.js")(app, productModel, productImageUpload);

    /*Provider*/
    var providerSchema = require("./models/provider/provider.schema.server")(mongoose);
    var providerDB = mongoose.model("Provider", providerSchema);
    var providerModel = require("./models/provider/provider.model")(providerDB);
    require("./services/provider/provider.service.server.js")(app, productModel, providerModel);

    var categoryModel = require("./models/category/category.model.js")(q, request, mongoose);
    var categoryService = require("./services/category/category.service.server")(app, categoryModel, q, ebayAPIClient);

    var catalogModel = require('./models/catalog/catalog.model.js')(q, mongoose);
    var catalogService = require("./services/catalog/catalog.service.server.js")(app, catalogModel, categoryService, q);

    var MessageModel = require("./models/message/message.model.js")(q, mongoose, userModel);
    require("./services/message/message.service.server.js")(app, MessageModel);

    var listingSchema = require("./models/listing/listing.schema.server")(mongoose);
    var ebayListingSchema = require("./models/listing/ebay.listing.schema.server")(mongoose);
    var ebayListingDB = mongoose.model("EbayListing", ebayListingSchema);
    var listingDB = mongoose.model("Listing", listingSchema);
    var listingModel = require("./models/listing/listing.model")(listingDB, ebayListingDB, q);
    require("./services/listing/listing.service.server")(app, q, listingModel, categoryModel, ebayAPIClient, upload, amazonAPIClient, uuid, categoryService, catalogService);


    //require("./services/image/clarfai.image.service")();
};