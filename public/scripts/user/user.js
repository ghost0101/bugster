'use strict';
angular.module('app.user', [])
  .controller('UserCtrl',['$scope','$modal','$routeParams','$http','User','$route','Ad','Place',function($scope,$modal,$routeParams,$http,User,$route,Ad,Place){
    $scope.FormEditProfile = {};
    $scope.FormChangePassword = {};

    var getProfile = function () {
      User.profile(function (err, data) {
        if (err) {
              $scope.notify('danger','Ops! Something went wrong, please try again later');
            } else{
              $scope.FormEditProfile = data;
              $scope.profile = data;
              $scope.FormEditProfile.user_birthday = new Date(data.user_birthday);
            };
      });
    }

    User.getOcupations(function (err,data) {
      if (err) {
        alert('Error');
        console.log(err);
      } else{
        $scope.ocupations = data;
      };
    });

    Ad.getHutTypes(function (err,data) {
      if (err) {
        alert('Error: '+err);
      } else{
        $scope.hut_types = data;
      };
    });

    Ad.getFurnishing(function (err,data) {
      if (err) {
        alert('Error: '+err);
      } else{
        $scope.furnishing = data;
      };
    });

    function getIcons() {
      User.getIcons(function (err,data) {
        if (err) {
          alert('Error: '+err);
        } else{
          $scope.icons = data;
        };
      });
      User.getUserIcons(function (err,data) {
        if (err) {
          alert('Error: '+err);
        } else{
          $scope.user_icons = data;
        };
      });
    }

    Ad.getDurations(function (err,data) {
      if (err) {
        alert('Error: '+err);
      } else{
        $scope.durations = data;
      };
    });


    getProfile();
    getIcons();

    User.getLocationsUnselected(function (err,data) {
      if (err) {
        $scope.notify('danger',"Error loading the locations");
      } else {
        $scope.locations = data;
      }
    });

    function myLocations() {
      User.getLocations(function (err,data) {
        if (err) {
          $scope.notify('danger',"Error loading the locations");
        } else {
          $scope.my_locations = data;
        }
      });
    }

    myLocations();

    $scope.toggleUserIcon = function (icon_id) {
      User.toggleIcon(icon_id,function (err,data) {
        if (err) {
          console.log(err);
          $scope.error = "Error D:";
        } else {
          $scope.notify('success','Detail added!');
          getIcons();
        }
      });
    }

    $scope.toggleUserLocation = function (id) {
      User.toggleLocation(id,function (err,data) {
        if (err) {
          console.log(err);
          $scope.error = "Error D:";
        } else {
          $scope.notify('success','Location added!');
          myLocations();
        }
      });
    }

      $scope.editProfile = function() {
        var data = $scope.FormEditProfile;
        User.update(data,function (err, data) {
          if (err) {
            $scope.notify('danger','Ops! Something went wrong, please try again later');
          } else{
            $scope.notify('success','Done!');
          };
        });
      };

      $scope.checkNick = function (nick) {
        User.nick(nick,function (err, data) {
          if (data) {
            $("#nickMsj").text(data);
          };
        })
      }

      $scope.coinciden = function() {
          var pass1 = document.getElementById("pass1").value;
          var pass2 = document.getElementById("pass2").value;
          var ok = true;
          if (pass1 != pass2) {
              document.getElementById("pass1").style.borderColor = "#E34234";
              document.getElementById("pass2").style.borderColor = "#E34234";
              ok = false;
              $("#passSubmit").attr("disabled",true);
          }
          else {
              document.getElementById("pass1").style.borderColor = "#04B404";
              document.getElementById("pass2").style.borderColor = "#04B404";
              $("#passSubmit").attr("disabled",false);
          }
          return ok;
      }

      $scope.changePass = function () {
        var data = $scope.FormChangePassword;
        User.updatePass(data,function (err, data) {
          if (err) {
            console.log(err);
            $scope.notify('danger','Ops! Something went wrong, please try again later');
          } else{
            $scope.notify('success','Done!');
          };
        });
      }



      $scope.uploadFile = function(files) {
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", files[0]);
            $http.post('/api/upload', fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            }).success(function () {
              $scope.notify('success','Done!');
              getProfile();
            }).error(function () {
              $scope.notify('danger','Ops! Something went wrong, please try again later');
            });

        };

      $scope.uploadLogo = function(files) {
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", files[0]);


            $http.post('/api/upload', fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            }).success(function () {
              $scope.notify('success','Todo salió bien');
            }).error(function () {
              $scope.notify('danger','Todo salió mal');
            });

        };


}]).controller('ReportUserCtrl',['$scope','User','$modal',function ($scope,User,$modal) {

  $scope.reportUser = function (user_id) {
    console.log(user_id);
    var modalInstance = $modal.open({
      templateUrl: 'scripts/user/report.html',
      controller: ModalReportUserCtrl,
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

}]);

var ModalReportUserCtrl = ['$scope','user_id','User','$modalInstance',function ($scope,user_id,User,$modalInstance) {

  $scope.FormReportUser = {};
  $scope.ok = function () {
    $modalInstance.close();
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


  $scope.sendNow = function () {
      console.log("Sending message to "+user_id);
      if (!$scope.FormReportUser.report_detail) {
        $scope.FormReportUser.report_detail = '';
      }
      $scope.FormReportUser.user_content = $scope.FormReportUser.user_content + ' ' + $scope.FormReportUser.report_detail;

      User.report($scope.FormReportUser,user_id,function (err,data) {
        if (err) {
          console.log(err);
          alert('Error reporting the user :/, plese try again later');
        } else {
          $scope.ok();
          alert(data);
        }
      });

  }

}];
