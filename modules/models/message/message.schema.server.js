/**
 * Created by ronnygeo on 4/12/16.
 */
module.exports = function (mongoose) {
    var UserSchema = require("../user/user.schema.server.js")(mongoose);
    // use mongoose to declare a user schema
    var MessageSchema = mongoose.Schema({
        from: String,
        to: String,
        subject: String,
        message: String,
        unread: Boolean,
        user: UserSchema
    }, {collection: 'message'});
    return MessageSchema;
}