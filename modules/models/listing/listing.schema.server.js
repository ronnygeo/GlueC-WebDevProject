module.exports = function (mongoose) {
    var EbayListingSchema = require("./ebay.listing.schema.server")(mongoose);
    return mongoose.Schema({
        userId: String,
        parentCategoryId: String,
        subCategoryId: String,
        providerId: String,
        title: String,
        description: String,
        images: [String],
        ebay: EbayListingSchema,
        model: String,
        mpn: String
    })
};