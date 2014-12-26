
/* Ads model... but we will use the word "ADDS" to avoid add block */

angular.module('ModelPlace',  ['ngRoute'])
        //esto se queda, pero solo como adorno para futuras referencias
        .factory ('Place', ['$http',function ($http) {

            return {
                cities:function (callback) {
                  $http.get('/api/places/cities').success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                },
                locations:function (callback) {
                  $http.get('/api/places/locations').success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                },
                city_locations:function (id,callback) {
                  $http.get('/api/places/city/'+id).success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                },
                locations_city_name:function (id,callback) {
                  $http.get('/api/places/city/'+id+'/name').success(function (data) {
                        callback(null,data)
                     }).error(function(err){
                        callback(err,null);
                  });
                }


            }
}]);
