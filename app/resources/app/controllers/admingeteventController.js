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
    $scope.save = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      return $http.put('/event?id=' + id, data);
    };
});