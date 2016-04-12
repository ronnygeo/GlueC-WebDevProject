/**
 * Created by ronnygeo on 4/12/16.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a user schema
    var MessageSchema = mongoose.Schema({
        from: String,
        to: String,
        subject: String,
        message: String,
        unread: Boolean
    }, {collection: 'message'});
    return MessageSchema;
}