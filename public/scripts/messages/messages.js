'use strict';
angular.module('app.messages', [])
  .controller('InboxCtrl',['$scope','$modal','$routeParams','$route','$window','Message',function($scope,$modal,$routeParams,$route, $window,Message){

    Message.inbox(function (err,data) {
      if (err) {
        alert('Error '+err);
      } else {
        $scope.inbox = data;
      }
    });

    function sent() {
      Message.sent(function (err,data) {
        if (err) {
          alert('Error '+err);
        } else {
          $scope.sent = data;
        }
      });
    }

    $scope.deleteConversation = function (id) {
      var si = confirm('Are you sure you want to delete this conversation?');
      if (si) {
        Message.deleteConversation(id,function (err,data) {
          if (err) $scope.notify('danger',err);
          else{
            sent();
            $scope.notify('success',data);
          }
        });
      }
    }

    sent();

}]);




/* Send message*/



var MessagesCtrl = ['$modal','$scope','Message','$rootScope','$window',function ($modal,$scope,Message,$rootScope,$window) {

    setInterval(function() {
      $scope.unread();
    }, 20000);



    $scope.unread = function() {
      Message.unread(function (err,data) {
        if (err) {
          console.log(err);
          alert('Ops there was an error, we will redirect you to login');
          $window.location = '/signup';
        } else {
          $scope.unread_messages = data;
        }
      });
    }
    $scope.unread();

    $scope.sendMessage = function (user_id) {
      console.log(user_id);
      var modalInstance = $modal.open({
        templateUrl: 'scripts/messages/message.html',
        controller: ModalMessageCtrl,
        resolve: {
          user_id: function () {
            return user_id;
          }
        }
      });


      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        console.log('cerrado');
      });
    };
}]


var ModalMessageCtrl = ['$scope','user_id','Message','$modalInstance','$window','Message',function ($scope,user_id,Message,$modalInstance,$window) {

  $scope.FormMessage = {};
  $scope.ok = function () {
    $modalInstance.close();
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  function getConversation(user_id) {
    Message.conversation(user_id,function (err,data) {
      if (err) {
        alert('Error loading the conversation, please try again later');
      } else {
        $scope.conversation = data;
        // $rootScope.unread();
      }
    });
  }

  getConversation(user_id);

  $scope.sendNow = function () {
      console.log("Sending message to "+user_id);
      Message.send($scope.FormMessage,user_id,function (err,data) {
        if (err) {
          console.log(err);
          alert('Error sending the message, plese try again later');
        } else {
          $scope.ok();
          $scope.notify('success','Message sent');
          getConversation(user_id);
        }
      });

  }




}];
