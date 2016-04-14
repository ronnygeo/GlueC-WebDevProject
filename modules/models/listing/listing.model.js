module.exports = function (listingDB, ebayListingDB, q) {


    var api = {
        ebay: {
            createNewListing: createNewListing,
            addImageToListing: addImageToListing,
            populateFeatures: populateFeatures,
            saveListing: saveListing,
            updateListingById: updateListingById,
            addImageAndCategoryDetails: addImageAndCategoryDetails,
            getListingById:getListingById
        }

    };
    return api;


    function getListingById(listingId){
        return listingDB.findById(listingId);
    }

    function addImageAndCategoryDetails(listingId, listing) {
        return listingDB.findById(listingId)
            .then(function (listingDoc) {
                console.log("Found Listing");
                listingDoc.categoryDetails = listing.categoryDetails;
                listingDoc.siteHostedPictureDetails = listing.siteHostedPictureDetails;
                listingDoc.markModified("categoryDetails");
                listingDoc.markModified("siteHostedPictureDetails");
                return listingDoc.save();
            }, function (err) {
                console.log(err)
            })
    }

    function updateListingById(listingId, listing) {
        return listingDB.findOneAndUpdate(
            {_id: listingId},
            {$set: listing},
            {new: true}
        );
    }

    function    saveListing(listingDoc) {
        var deferred = q.defer();
        listingDoc.save(function (err, data) {
            if (err) {
                console.log("Error While Saving.");
                console.log(err);
                deferred.reject(err);
            } else {
                console.log("Saved Successful.");
                console.log(data);
                deferred.resolve(data);
            }
        });
        return deferred.promise;
    }

    function createNewListing(listing) {
        return listingDB.create(listing);
    }

    function addImageToListing(listingId, image) {

    }

    function populateFeatures(listingId) {

    }


};
