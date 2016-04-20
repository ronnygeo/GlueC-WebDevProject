module.exports = function (mongoose) {
    return mongoose.Schema({
        code: String,
        name: String,
        providerUsername: String,
        userId: String,
        authToken: String,
        apiKey: String,
        details: String
    }, {collection: 'provider'})
};