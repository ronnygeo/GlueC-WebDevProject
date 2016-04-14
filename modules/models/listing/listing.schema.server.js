module.exports = function (mongoose) {
    var EbayListingSchema = require("./ebay.listing.schema.server")(mongoose);
    return mongoose.Schema({
        userId: String,
        parentCategory: String,
        subCategory: String,
        providerId: String,
        title: String,
        description: String,
        images: [String],
        ebay: EbayListingSchema,
        model: String,
        mpn: String,
        price: String,
        startingPrice: String
    }, {collection: 'listing'})
};