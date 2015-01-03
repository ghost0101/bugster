angular.module('app.post', ['infinite-scroll','ModelPost'])
  .controller('PostCtrl',['$scope','Post','$rootScope',function ($scope,Post,$rootScope) {

    var post = document.URL.split('/post/');
    post = post[1];


    $rootScope.io.emit('posts:views',post);
    $rootScope.io.on('posts:views', function(data) {
      $scope.post_views = data.views;
      $('#post_views').html(data.views);
    });


  }])
  .controller('NewPostCtrl',['$scope','$modal',function ($scope,$modal) {


    $scope.FormPost = {};

    $scope.newPost = function () {
      var url = document.URL.split('/rincon/')
      rincon = url[1]

      var modalInstance = $modal.open({
        templateUrl: 'scripts/posts/new.html',
        controller: ModalPost,
        resolve: {
          rincon: function () {
            return rincon;
          }
        }
      });


      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        console.log('cerrado');
      });
    };






  }])
  .controller('BrowseCtrl', ['$scope','Lazy', function($scope,Lazy) {

    $scope.Lazy = new Lazy();

  }]).factory('Lazy',['$http', function($http) {
    var Lazy = function() {
      this.items = [];
      this.busy = false;
      this.after = '';
      this.error = '';
      this.location = '';
      var url = document.URL.split('/rincon/');

      url = url[1];
      this.url = url;
    };

    Lazy.prototype.clearHuts = function () {
      this.items = [];
    };

    Lazy.prototype.posts = function() {
      if (this.busy) return;
      this.busy = true;
      console.log("After: "+this.after);
      var latest;
      var url = "/api/rincones/"+this.url+"/?after="+this.after;
      $http.post(url)
          .error(function(err){
              console.log(err);
          })
          .success(function(data) {
            var items = data;
            for (var i = 0; i < items.length; i++) {
              this.items.push(items[i]);
              latest = items[i].date;
            }
            this.after = latest;
            // console.log("Latest "+latest);
            this.busy = false;
          }.bind(this));
    };



    return Lazy;
  }]);


var ModalPost = ['rincon','$scope','$rootScope','Post','$modalInstance',function(rincon,$scope,$rootScope,Post,$modalInstance) {
  console.log(rincon);

    $rootScope.FormPost = {};

  $scope.ok = function () {
    $modalInstance.close();
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


  $scope.sendPost = function () {
    $scope.FormPost.rincon = rincon;
    Post.create($scope.FormPost,function (err,data) {
      if (err) {
        alert(err);
      } else {
        swal('Listo!',data,'success');
        $scope.cancel();
      }
    });
  }

}];
