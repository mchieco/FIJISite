fijiApp.controller('adminEboardController', function($scope, $http) {
    $scope.admin= {};
    $http.get('/eboardadmins')
    .then(function(result) {
      $scope.admin = result.data;
  });
    $scope.remove = function(id) {
      console.log(id);
      $http.delete('/eboardadmins?id=' + id)
      .then(function(res) {
          window.location.reload();
      });
    };
});