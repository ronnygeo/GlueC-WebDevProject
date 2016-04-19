/**
 * Created by ronnygeo on 3/26/16.
 */

module.exports = function (q, mongoose, userModel) {
    //var messages = require("./message.test.json");
    var MessageSchema = require("./message.schema.server.js")(mongoose);
    var MessageModel = mongoose.model('Message', MessageSchema);

    var api = {
        findMessagesByUser: findMessagesByUser,
        findMessageById: findMessageById,
        createMessage: createMessage,
        deleteMessage: deleteMessage
    }

    return api;

    function findMessagesByUser(userId) {
        var deferred = q.defer();
        MessageModel
            .find({"to": userId})
            .then(
                function(messages) {
                    deferred.resolve(messages);
                },
                function(err) {
                    deferred.reject(err);
                }
            );
        return deferred.promise;
    }

    function findMessageById(msgId) {
        var deferred = q.defer();
        MessageModel.findById(msgId).then(function(data){
            deferred.resolve(data);
        }, function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    }

    function createMessage(userId, msg) {
        var deferred = q.defer();
        userModel.findUserById(userId).then(function (user) {
            msg.user = user;
            // console.log(msg);
            MessageModel.create(msg).then(function (data) {
                deferred.resolve(data);
            }, function (err){
                deferred.reject(err);
            });
        });
        return deferred.promise;
    }

    function deleteMessage(msgId) {
        var deferred = q.defer();
        MessageModel.remove({_id: msgId}).then(function (data) {
            deferred.resolve(data);
        }, function (err){
            deferred.reject(err);
        });
        return deferred.promise;
    }
};