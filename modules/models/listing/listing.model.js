module.exports = function (listingDB, ebayListingDB) {


    var api = {
        ebay: {
            createNewListing: createNewListing,
            addImageToListing: addImageToListing,
            populateFeatures: populateFeatures
        }

    };
    return api;


    function createNewListing(listing) {
        return listingDB.create(listing);
    }

    function addImageToListing(listingId, image) {

    }

    function populateFeatures(listingId) {

    }


};
