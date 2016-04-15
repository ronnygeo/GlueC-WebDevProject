/**
 * Created by ronnygeo on 4/1/16.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String],
        imageUrl: String,
        phone: String
    }, {collection: 'user'});
    return UserSchema;
}