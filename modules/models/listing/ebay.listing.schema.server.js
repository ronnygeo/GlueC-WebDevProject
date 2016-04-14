module.exports = function (mongoose) {
    return mongoose.Schema({
        ebayListingItemId: String,
        ebayListingUrl: String,
        parentCategory: String,
        subCategory: String,
        itemCondition: String,
        listingType: String,
        paymentMethod: String,
        returnPolicyEnabled: String,
        listingDuration: String,
        categoryDetails:{},
        siteHostedPictureDetails: {},
        publishDetails:{}
    }, {collection: 'ebayListing'})
};