/**
 * Created by ronnygeo on 4/12/16.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a user schema
    var CatalogSchema = mongoose.Schema({
        name: String,
        description: String,
        merchantId: String,
        productIds: [String]
    }, {collection: 'catalog'});
    return CatalogSchema;
}