/**
 * Created by ronnygeo on 3/26/16.
 */

module.exports = function (app, MessageModel) {

    app.get('/api/user/:id/messages', findMessagesByUser);
    app.get('/api/message/:msgId', findMessageById);
    app.post('/api/user/:id/message', createMessage);
    app.delete('/api/message/:msgId', deleteMessage);

    function findMessagesByUser(req, res) {
        var userId = req.params.id;
        MessageModel.findMessagesByUser(userId).then(function (data) {
            res.json(data);
        });
    }

    function findMessageById(req, res) {
        var msgId = req.params.msgId;
        console.log(msgId);
        MessageModel.findMessageById(msgId).then(function (data) {
            console.log(data);
            res.json(data);
        });
    }

    function createMessage(req, res) {
        var userId = req.params.id;
        var msg = req.body;
        MessageModel.createMessage(userId, msg).then(function (data) {
            res.json(data);
        });
    }

    function deleteMessage(req, res) {
        var msgId = req.params.msgId;
        MessageModel.deleteMessage(msgId).then(function (data) {
            res.json(data);
        });
    }
};