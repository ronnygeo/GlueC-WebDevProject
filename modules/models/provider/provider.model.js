/**
 * Created by Bhanu on 15/04/2016.
 */
module.exports = function (providerDB) {

    var api = {
        getProvidersForUser: getProvidersForUser,
        addProviderForUser: addProviderForUser
    };
    return api;

    function addProviderForUser(provider) {
        console.log("Server ProviderModel addProviderForUser");
        return providerDB.create(provider);
    }

    function getProvidersForUser(userId) {
        console.log("Server ProviderModel getProvidersForUser");
        return providerDB.find({userId: userId});
    }
};
