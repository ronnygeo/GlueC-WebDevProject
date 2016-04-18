module.exports = function (mongoose) {
    var EbayListingSchema = require("./ebay.listing.schema.server")(mongoose);
    return mongoose.Schema({
        userId: String,
        parentCategory: String,
        subCategory: String,
        providerId: String,
        title: String,
        description: String,
        flow: String,
        images: [String],
        ebay: EbayListingSchema,
        price: {
            value:String,
            currency:String
        },
        startingPrice: String,
        features: [{
            name: String,
            value: String
        }],
        model: String,
        mpn: String,
        isComplete: {
            type: Boolean,
            default: false
        },
        providerItemId : String
    }, {collection: 'listing'})
};