
module.exports = function (mongoose) {
    return mongoose.Schema({
        code: String,
        name: String,
        userId: String,
        accessToken: String,
        apiKey: String,
        details: String
    }, {collection: 'provider'})
};