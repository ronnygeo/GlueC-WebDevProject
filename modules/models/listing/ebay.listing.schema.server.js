module.exports = function (mongoose) {
    return mongoose.Schema({
        ebayListingItemId: String,
        ebayListingUrl: String,
        parentCategory: {
            name: String,
            code: String
        },
        subCategory: {
            name: String,
            code: String
        },
        itemCondition: {},
        listingType: String,
        paymentMethod: String,
        returnPolicyEnabled: String,
        listingDuration: String,
        categoryDetails: {},
        siteHostedPictureDetails: {},
        publishDetails: {},
        image: String
    }, {collection: 'ebayListing'})
};