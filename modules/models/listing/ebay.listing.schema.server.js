module.exports = function (mongoose) {
    return mongoose.Schema({
        ebayListingId: String,
        //itemCondition: {
        //    type: String,
        //    default: "USED",
        //    enum: ['NEW', 'USED', 'OTHER']
        //},
        itemCondition: String,
        listingType: String,
        paymentMethod: String,
        returnPolicyEnabled: String,
        listingDuration: String
    })
};