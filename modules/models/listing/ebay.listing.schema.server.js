module.exports = function (mongoose) {
    return mongoose.Schema({
        ebayListingItemId: String,
        ebayListingUrl: String,
        parentCategoryId: String,
        parentCategoryName: String,
        subCategoryId: String,
        subCategoryName: String,
        itemCondition: {},
        listingType: String,
        paymentMethod: String,
        returnPolicyEnabled: String,
        listingDuration: String,
        categoryDetails:{},
        siteHostedPictureDetails: {},
        publishDetails:{},
        image:String
    }, {collection: 'ebayListing'})
};