angular.module('login', [])
  .controller('password', ['$scope','$http', function($scope,$http) {    
    $scope.FormPass = {};

    $scope.sendNewPass = function () {                  
      console.log($scope.FormPass);
      if ($scope.FormPass.user_email!=undefined) {
        
          $http({
                data    :  $scope.FormPass,
                method  : 'POST',
                url     : '/api/user/check/email'
            })
              .success(function(data) {                            
                  alert(data);
              }).error(function(err){
                  alert(err);
              });                
      }else{
          alert('Please type your email');
      }
          
    }
  }]);