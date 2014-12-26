
/* Message Model*/

angular.module('ModelMessage',  ['ngRoute'])
        //esto se queda, pero solo como adorno para futuras referencias
        .factory ('Message', ['$http',function ($http) {

            return {
                send:function (datos,user_id,callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/messages/'+user_id
                      })
                        .success(function(data) {
                            callback(null,data);
                        }).error(function(err){
                            callback(err,null);
                        });
                },
                conversation:function (user_id,callback) {
                  $http.get('/api/messages/'+user_id).success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                },
                unread:function (callback) {
                  $http.get('/api/messages/inbox/unread').success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                },
                inbox:function (callback) {
                  $http.get('/api/messages/inbox/').success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                },
                deleteConversation:function (user_id,callback) {
                  $http.delete('/api/messages/'+user_id).success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                },
                sent:function (callback) {
                  $http.get('/api/messages/inbox/sent').success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                }
            }
}]);
