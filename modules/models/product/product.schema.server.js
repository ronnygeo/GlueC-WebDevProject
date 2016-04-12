/**
 * Created by ronnygeo on 4/12/16.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a user schema
    var ProductSchema = mongoose.Schema({
        externalItemId: String,
        title: String,
        name: String,
        manufacturer: String,
        description: String,
        categories: [String],
        price: Number,
        discount: Number,
        providerId: String,
        catalogId: String,
        merchantId: String,
        imageUrl: String,
        providerUrl: String
    }, {collection: 'product'});
    return ProductSchema;
}