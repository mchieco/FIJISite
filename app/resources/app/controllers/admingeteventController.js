fijiApp.controller('admingeteventController', function($scope, $http) {
    $scope.events = {};
    $http.get('/event')
      .then(function(result) {
        $scope.events = result.data;
    });
    $scope.remove = function(id) {
      console.log(id);
      $http.delete('/event?id=' + id)
      .then(function(res) {
          window.location.reload();
      });
    };
});