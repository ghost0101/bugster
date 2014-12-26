'use strict';
angular.module('app.controllers', []).controller('AppCtrl', [
  '$scope', '$location','$http','logger','$rootScope', function($scope, $location,$http,logger,$rootScope) {

    $scope.isSpecificPage = function() {
      var path;
      path = $location.path();
      // return _.contains(['/404', '/pages/500', '/pages/login', '/pages/signin', '/pages/signin1', '/pages/signin2', '/pages/signup', '/pages/signup1', '/pages/signup2', '/pages/lock-screen'], path);
    };



    //   Código para que al cambiar de página el scroll se vaya hasta arriba
    $rootScope.$on('$viewContentLoaded', function(){

      var interval = setInterval(function(){
        if (document.readyState == "complete") {
            window.scrollTo(0, 0);
            clearInterval(interval);
        }
      },200);

      });

    $scope.notify = function(type,msg) {
      switch (type) {
        case 'info':
          return logger.log(msg);
        case 'success':
          return logger.logSuccess(msg);
        case 'warning':
          return logger.logWarning(msg);
        case 'error':
          return logger.logError(msg);
      }
    };


    //Get the signal from server and create your list
    // io = io.connect()
    // io.on('announce', function (data){
    //   // console.log(data);
    //   $scope.clients = data.clients;
    // });

    $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(response){
        return response.data.results.map(function(item){
          return item.formatted_address;
        });
      });
    };


    // Información del usuario actual
    $http.get('/api/user/profile').success(function (data,status,headers,config) {

       $scope.user = data;
       $scope.foto = $scope.user.user_picture;
      //  console.log($scope.user);
       io.emit('connect', {
         room: 'room',
         user: data.user_name
       });


       if (data.user_picture) {
       }else{
          $scope.foto = 'http://graph.facebook.com/'+ data.user_facebook + '/picture';
       }

     });

  }
]).controller('NavCtrl', [
  '$scope',  'filterFilter', 'Pagina', function($scope, filterFilter, Pagina) {


    // $scope.misPaginas = [{'pagina_nombre':'asdasd','dos':'asdasd'},{'pagina_nombre':'asdasd'}];



  }
]).controller('DashboardCtrl', [
  '$scope','$timeout', function($scope,$timeout) {

    $scope.algo = 'texto from controller';

    io = io.connect()
      io.on('posts:create', function(data) {
      $('ul').append('<li>'+data.post+' <a href="#" id='+data.id+'>delete</a></li>')
    });
    io.on('posts:remove', function(data) {
      $('a[id='+data.id+']').parent().remove();
    });
    io.on('posts:saludar', function(data) {
      alert(data.data);
    });

    io.on('posts:list',function (data) {      
      console.log(data);
      var i = 1;
      // data.images.forEach(function (d) {
      //   console.log(d);
      //   i++;
      // });

      $timeout(function () {
        $scope.images = data.images;
      },1);

    });


    io.emit('posts:list', "hola");


      $('button.create').click(function() {
        var data = {post: prompt('Type a post!')}
        io.emit('posts:create', data);
      })
      $('body').on('click', 'a', function(event) {
        event.preventDefault()
        io.emit('posts:remove', {id: $(event.currentTarget).attr('id')});
      })



    $scope.saludar = function(saludo) {
      console.log("enviando saludo"+saludo);
      io.emit('posts:saludar',{data:prompt("Envía un saludo")});
    }
    // body...



  }
]).controller('SignUpCtrl', [
  '$scope','User','$window', function($scope,User,$window) {

    $scope.addUser = function () {
      User.create($scope.FormAddUser,function (err, data) {
        if (err) {alert('Error');}
        else{
          alert(data);
        };
      });
    }
  }
]);


var ModalInstanceCtrl = function ($scope, $modalInstance,$location) {


  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.go = function (url) {
    $location.path(url);
  }

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
