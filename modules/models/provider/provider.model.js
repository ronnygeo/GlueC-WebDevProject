/**
 * Created by Bhanu on 15/04/2016.
 */
module.exports = function (providerModel) {

    var api = {
        getProvidersForUser: getProvidersForUser,
        addProviderForUser: addProviderForUser
    };
    return api;

    function addProviderForUser(provider) {
        console.log("Server ProviderModel addProviderForUser");
        return providerModel.create(provider);
    }

    function getProvidersForUser(userId) {
        console.log("Server ProviderModel getProvidersForUser");
        return providerModel.find({userId: userId});
    }
};
