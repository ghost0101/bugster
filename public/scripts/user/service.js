'use strict';
/* Modelo pagos */

angular.module('ModelUser',['ngRoute'])
        //esto se queda, pero solo como adorno para futuras referencias
        .factory ('User', ['$http',function ($http) {

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
                    $http.get('/api/user/profile').success(function (data) {
                        // return data;
                        if (data) {
                          callback(null,data);
                        }else{
                          callback(null,'');
                        }


                     });
                },
                update:function (datos, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/user/edit'
                      }).success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Error',null);
                        });
                },
                updatePass:function (datos, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/user/editPass'
                      }).success(function(data) {
                            callback(null,'Ok');
                        }).error(function(err){
                            callback('Error',null);
                        });
                },
                getOcupations:function (callback) {
                  $http.get('/api/adds/mate/ocupation').success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                },
                getIcons:function (callback) {
                  $http.get('/api/user/icon-not').success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                },
                getUserIcons:function (callback) {
                  $http.get('/api/user/icon').success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                },
                toggleIcon:function (icon_id,callback) {
                    $http.get('/api/user/icon/'+icon_id).success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                },

                getLocations:function (callback) {
                  $http.get('/api/user/locations/desired').success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                },
                getLocationsUnselected:function (callback) {
                  $http.get('/api/user/locations/all').success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                },
                toggleLocation:function (id,callback) {
                    $http.get('/api/user/location/'+id).success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                },
                nick:function (nick ,callback) {
                  $http.get('/api/user/nick/'+nick).success(function (data) {
                        // return data;
                        if (data!="") {
                          callback(null,data);
                        };
                     });
                },
                report:function (datos,id, callback) {
                    $http({
                          data    :  datos,
                          method  : 'POST',
                          url     : '/api/mates/'+id+'/report'
                      }).success(function(data) {
                            callback(null,data);
                        }).error(function(err){
                            callback(err);
                        });
                }
            }
}]);
