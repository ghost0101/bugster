
/* Modelo pagos */

angular.module('ModelPost',  [])
        //esto se queda, pero solo como adorno para futuras referencias
        .factory ('Post', ['$http',function ($http) {

            return {
                test:function () {
                  alert('msg');
                },
                create:function (datos, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/posts/'
                      })
                        .success(function(data) {
                            callback(null,data);
                        }).error(function(err){
                            callback(err,null);
                        });
                },
                profile:function (id,callback) {
                    $http.get('/api/contact/'+id).success(function (data) {
                          callback(null,data);
                     }).error(function (err) {
                           callback(err);
                     });
                },
                list:function (callback) {
                  $http.get('/api/contact/all').success(function (data) {
                    callback(null,data);
                   }).error(function (err) {
                         callback(err);
                   });
                }


            }
}]);
