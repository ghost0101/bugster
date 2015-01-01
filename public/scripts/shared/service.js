'use strict';
/* Modelo pagos */

angular.module('ModelMain',['ngRoute'])
        //esto se queda, pero solo como adorno para futuras referencias
        .factory ('Bugster', ['$http',function ($http) {

            return {
                create:function (datos, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/user/add'
                      })
                        .success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Error',null);
                        });
                },

                profile:function (callback) {
                  $http.get('/api/users/profile').success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                },
                rincones:function (callback) {
                  $http.get('/api/rincones/').success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                }
            }
}]);
