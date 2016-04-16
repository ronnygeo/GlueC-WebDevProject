/**
 * Created by Bhanu on 15/04/2016.
 */
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