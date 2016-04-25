/**
 * Created by ronnygeo on 3/26/16.
 */

(function () {
    angular.module('GluecApp')
        .factory('MessageService', MessageService);

    MessageService.$inject = ['$http'];
    function MessageService($http) {
        return {
            findMessagesByUser: findMessagesByUser,
            findMessagesById: findMessagesById,
            createMessage: createMessage,
            deleteMessage: deleteMessage
        };

        function findMessagesByUser(userId) {
            return $http.get('/api/user/'+userId+'/messages');
        }

        function findMessagesById(msgId) {
            return $http.get('/api/message/'+msgId);
        }

        function createMessage(userId, msg){
            return $http.post('/api/user/'+userId+'/message', msg);
        }

        function deleteMessage(msgId) {
            return $http.delete('/api/message/'+msgId);
        }

    }
})();