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
    $scope.update = function(id) {
      console.log(id);
      $http.put('/contactus?id=' + id)
      .then(function(res){
        window.location.reload();
      });
    };
});