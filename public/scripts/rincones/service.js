
/* Modelo pagos */

angular.module('ModelRincon',  [])
        //esto se queda, pero solo como adorno para futuras referencias
        .factory ('Rincon', ['$http',function ($http) {

            return {
                create:function (datos, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/rincones/'
                      })
                        .success(function(data) {
                            callback(null,data);
                        }).error(function(err){
                            callback(err,null);
                        });
                },
                details:function (id,callback) {
                  $http.get('/api/rincones/'+id).success(function (data) {
                    callback(null,data);
                   }).error(function (err) {
                         callback(err);
                   });
                }


            }
}]);
