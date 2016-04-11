module.exports = function (mongoose) {
    return mongoose.Schema({
        ebayListingId: String,
        //itemCondition: {
        //    type: String,
        //    default: "USED",
        //    enum: ['NEW', 'USED', 'OTHER']
        //},
        parentCategory: String,
        subCategory: String,
        itemCondition: String,
        listingType: String,
        paymentMethod: String,
        returnPolicyEnabled: String,
        listingDuration: String,
        siteHostedPictureDetails: [{
            PictureSet: String,
            PictureFormat: String,
            FullURL: String,
            BaseURL: String,
            PictureSetMember: [{
                MemberURL: String,
                PictureHeight: String,
                PictureWidth: String
            }],
            ExternalPictureURL: String
        }]
    })
};