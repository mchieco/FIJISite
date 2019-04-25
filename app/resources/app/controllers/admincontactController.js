fijiApp.controller('admincontactController', function($scope, $http) {
    $scope.contacts = {};
    $http.get('/contactus')
      .then(function(result) {
      $scope.contacts = result.data;
    });
    $scope.remove = function(id) {
      console.log(id);
      $http.delete('/contactus?id=' + id)
      .then(function(res) {
        window.location.reload();
      });
    };
    $scope.save = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      return $http.put('/contactus?id=' + id, data);
    };
});