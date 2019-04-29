fijiApp.controller('loginController', function ($scope, $http) {
    $scope.user = {};
    $scope.submitForm = function () {
      $http({
        method: 'PUT',
        url: '/auth',
        data: {
          username: $scope.username,
          password: $scope.password,
        },
        headers: { 'Content-Type': 'application/json' }
      })
        .then(function (data) {
          console.log("Obtain The Grain");
          window.location.href = "/eboardadmin.html";
        })
        .catch(err=>{
            console.log(err);
        })
    };
  });