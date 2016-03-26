/**
 * Created by ronnygeo on 3/26/16.
 */

module.exports = function (q, uuid) {

    var messages = require("./message.test.json");

    var api = {
        findMessagesByUser: findMessagesByUser,
        findMessageById: findMessageById,
        createMessage: createMessage,
        deleteMessage: deleteMessage
    }

    return api;

    function findMessagesByUser(userId) {
        var collection = [];
        var deferred = q.defer();
        for (var m in messages) {
            if (messages[m].from == userId || messages[m].to == userId) {
                console.log(userId);
                collection.push(messages[m]);
            }
        }
        deferred.resolve(collection);
        return deferred.promise;
    }

    function findMessageById(msgId) {
        var deferred = q.defer();
        var found = 0;
        for (var m in messages) {
            if (messages[m]._id == msgId) {
                found = 1;
                deferred.resolve(messages[m]);
            }
        }
        if (found == 0) {
            deferred.reject();
        }
        return deferred.promise;
    }

    function createMessage(userId, msg) {
        msg._id = uuid.v1();
        messages.push(msg);
        deferred.resolve(msg);

        return deferred.promise;
    }

    function deleteMessage(msgId) {
        var deferred = q.defer();
        var found = 0;
        for (var m in messages) {
            if (messages[m]._id == msgId) {
                found = 1;
                messages.splice(m, 1);
                deferred.resolve(messages);
            }
        }
        if (found == 0) {
            deferred.reject();
        }
        return deferred.promise;

    }
};